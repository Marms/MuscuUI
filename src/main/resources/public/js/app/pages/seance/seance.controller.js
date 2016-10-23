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
        			console.log($scope.exos[i].name + " i.name");
        			if ($scope.exos[i].name === s.exercices[indexExo].exoPredef.name) {
        				ajouter = false;
        				// changement de la couleur du panel:
        				$scope.exos[i].done = EXO_DONE;
        				// TODO ajouter les series au panel
        			}
        		}
        		if (ajouter) {
        			$scope.exos.push(s.exercices[indexExo].exoPredef);
        			//s.exercices[indexExo].done = EXO_DONE;
        		}
        	}
        }
        
        /* modifie actualExo
         * - si exo non present dans les exercices de la seance en cours initialisation nouveau exo
         * - sinon recuperation de l object correspondant
         * */
        $scope.choixExo = function(exo) {
        	$scope.numero = 0;
        	if (exo.done === EXO_DONE) {
        		console.log("choix exo: maj exercice");
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
        		console.log("choix exo: creation d un exercice");
        		$scope.actualExo = {};        		
        		$scope.actualExo.series = [];
        		$scope.actualExo.exoPredef = exo; //set exotemplate
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
        	console.log("addSerie " + $scope.serie);
        	$scope.serie.numero = $scope.numero;
        	$scope.numero++;
        	$scope.actualExo.series.push($scope.serie);
        	// mise a zero du formulaire
        	$scope.initSerie();
        };

        
    });


angular.module('DashboardWM').service('seanceService', function($http) {
	// Makes the REST request to get the data to populate the grid.
	this.save = function(seance) {
		return $http.post('/v1/seance', seance);
	}

	this.getList = function() {
		return $http.get('/v1/seance/list');
	}
});