'use strict';

angular.module('DashboardWM')
    .controller('SeanceController', function ($scope, seanceService, seancePredefService, exoPredefService) {
    	var listView = $scope.listView  = [
    	    "LISTE_SEANCE",
    		"LISTE_SEANCE_PREDEF",
    		"LISTE_EXO_TEMPLATE",
    		"SELECTIONNER_EXO",
    		"LISTE_SERIE",
    		"ADD_OTHER_EXO"
    	];
    	var EXO_DONE = "panel-red";
   
     	$scope.initexoShown = function() {    		
    		$scope.exoShown = ["ABDO", "PECTORAUX", "JAMBE", "DOS", "MOLLET", "BRAS"];
    		$scope.exoHidden = [];
    	}
    	$scope.initexoShown();

    	$scope.changeView = function(index) {
    		console.log("view " + listView[index]);
    		$scope.actualView = listView[index];
    	}

    	$scope.changeView(0);

    	// RECUPERATION DES DONNEES
        $scope.getExoTemplate = function() {
        	exoPredefService.getList().success(function(data) {
        		$scope.exoPredefs = data;        		
        	});
        }
        $scope.getExoTemplate();
        
        $scope.getSeanceTemplates = function() {
        	seancePredefService.getList().success(function(data) {
        		$scope.seanceTemplates = data;
        	});
        }
        $scope.getSeanceTemplates();
        
        $scope.getSeances = function() {
        	seanceService.getList().success(function(data) {
        		$scope.seances = data;
        	});
        }
        $scope.getSeances();
 
        // FUNCTION DE L APPLICATION
        $scope.choixSeance = function(seanceTemplate) {
        	$scope.seance = {};
        	$scope.seance.seancePredef = seanceTemplate;
        	$scope.seance.exercices = []; //init liste vide
        	$scope.affichageExo($scope.seance);
        	$scope.changeView(2);
        }

        $scope.saveSeance = function() {
        	seanceService.save($scope.seance).success( function(data) {
        		$scope.seance = data;
        		$scope.seances.push($scope.seance);
        		$scope.changeView(0);
                $scope.otherExo = [];
        	});
        }
        $scope.updateSeance = function(s) {
        	$scope.seance = s;
        	$scope.seancePredef = s.seancePredef;
        	$scope.affichageExo(s);
        	$scope.changeView(2);
        	console.log(s);
        }

        $scope.choixOtherExo = function(exo) {
        	$scope.choixExo(exo); // creation d un nouvau exo
        	$scope.affichageExo($scope.seance);
        	$scope.changeView(2);        	
        }

        //ajoute les exercice de la seance a la liste affichageExo:
        $scope.affichageExo = function(s) {
        	$scope.exos = s.seancePredef.list;
        	// ajout des exercices supplementaires + modification css
        	console.log("in exo " + $scope.exos);
        	
        	for (var indexExo =0; indexExo < s.exercices.length; indexExo++) {
        		var ajouter = true;
        		for (var i = 0; i < $scope.exos.length; i++) {
        			if ($scope.exos[i].name === s.exercices[indexExo].exoPredef.name) {
        				ajouter = false;
        				// changement de la couleur du panel:
        				$scope.exos[i].done = EXO_DONE;
        				// TODO ajouter les series au panel
        				$scope.exos[i].panelBody = $scope.createPanelBody(s.exercices[indexExo]);
        			}
        		}
        		if (ajouter) {
        			$scope.exos.push(s.exercices[indexExo].exoPredef);
        			//s.exercices[indexExo].done = EXO_DONE;
        		}
        	}
        }
        
        $scope.createPanelBody = function (exo) {
        	var body = "";
        	for (var i = 0; i < exo.series.length; i++) {
        		body += exo.series[i].nbRepeat + "*" + exo.series[i].poids + ";\n";
        	}
        	return body;
        }
        /** Renvoi la liste des series/date effectue sur l'exercice */
    	$scope.getOldSeries = function(exo) {
    		//parcourir les anciennes seances et recuperer les Exercices:
    		$scope.oldExoSeries = [];
    		for (var i = 0; i < $scope.seances.length; i++) {
    			var oldExo = $scope.seances[i].exercices.filter(function(exercice) {
    				return exercice.exoPredef.name == exo.name;
				});
//    			oldExo.datte = "a" + $scope.seances[i].date;
    			console.log("exdate2 " + oldExo.date);
    			$scope.oldExoSeries = $scope.oldExoSeries.concat(oldExo);
    		};
    		// 
    		
    	};
        /* modifie actualExo
         * - si exo non present dans les exercices de la seance en cours initialisation nouveau exo
         * - sinon recuperation de l object correspondant
         * */
        $scope.choixExo = function(exo) {
        	$scope.getOldSeries(exo);
        	$scope.numero = 0;
        	if (exo.done === EXO_DONE) {
        		$scope.actualExo = $scope.seance.exercices.filter(function(data) {
        			return data.exoPredef.id == exo.id;
        		})[0];
        		$scope.actualExo.done = EXO_DONE;
        		// Todo recuperation du numero de serie
								//        		for(var serie in $scope.actualExo.series) { //TODO doesnt work 
								//        			if ($scope.numero < serie.numero) {
								//        				$scope.numero = serie.numero;
								//        			}
								//        		}
        	} else {
        		$scope.actualExo = {};        		
        		$scope.actualExo.series = [];
        		$scope.actualExo.exoPredef = exo; //set exotemplate
        		$scope.actualExo.date = new Date();
        		console.log("date exo " + $scope.actualExo.date);
        		$scope.seance.exercices.push($scope.actualExo);
        	}
        	$scope.initSerie();
        	exo.done = EXO_DONE;
        	$scope.changeView(4);
        	$scope.gridSeries = {
            		data: 'actualExo.series'
            }
        };
        
 
        $scope.initSerie = function() {
        	console.log("initSerie");
        	$scope.serie = {};
        	$scope.serie.nbRepeat = 10;
        }

        // ajout de la serie a la liste de series de l'exercice actuel
        $scope.addSerie = function() {
        	$scope.serie.numero = $scope.numero;
        	$scope.numero++;
        	$scope.actualExo.series.push($scope.serie);
        	// mise a zero du formulaire
        	$scope.initSerie();
        };

    	$scope.hideExo = function(id) {
    		var index = $scope.exoShown.indexOf(id);
    		if (index >= 0) {
    			$scope.exoShown.splice(index, 1);
    			$scope.exoHidden.push(id);
    		}
    		console.log("exoShown " + $scope.exoShown);
    	}
    	$scope.showExo = function(exo) {
    		var index = $scope.exoHidden.indexOf(exo);
    		if (index >= 0) {
    			$scope.exoHidden.splice(index,1);
    		}
    		$scope.exoShown.push(exo);
    	}
    	/** renvoi vrai si le type exo est egale au exo a voir*/
    	$scope.showLine = function(e) {
    		if (e.type.length == 0) {
    			// cas des exo n'ayant pas de type definie
    			return true;
    		}
    		for (var i =0; i < e.type.length ; i++) {
    			if ($scope.exoShown.indexOf(e.type[i]) >= 0) {
    				return true;
    			}
    		}
    		return false;
    	};
    	
    	$scope.open = function($event) {
             $event.preventDefault();
             $event.stopPropagation();

             $scope.obj = {
                  opened : true
             };
       };
    });


angular.module('DashboardWM').service('seanceService', function($http) {
	// Makes the REST request to get the data to populate the grid.
	this.save = function(seance) {
		return $http.post('/v1/seance', seance);
	}

	this.getSeance = function(scId) {
		return $http.get('/v1/seance/'+ scId);
	}
	this.getList = function() {
		return $http.get('/v1/seance/list');
	}
});