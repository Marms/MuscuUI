'use strict';

angular.module('DashboardWM')
    .controller('ExerciceController',function ($scope, $rootScope, $stateParams, $location, seanceService, exerciceService, exoPredefService) {
    	var showListExoTemplate = $scope.showListExoTemplate= false;
    
    	// hide liste exo et show liste exoPredef
    	
    	$scope.otherExoDone = function(exoTemplateId) {
    		$scope.changeView();
    		console.log("ok");
    		//creation d'un exercice dans la seance:
    	}
    	$scope.changeView= function() {
    		$scope.showListExoTemplate = !$scope.showListExoTemplate;
    		console.log("CHANGE");
    	}
    	var EXO_DONE = "panel-red";
    	var exoTemplateId = $stateParams.exoTemplateId;
    	var exoId = $scope.id = $stateParams.exoId;
    	var scId = $scope.scId = $stateParams.scId;
    	// RECUPERATION DES DONNEES
        $scope.getExoTemplate = function() {
        	console.log("get Exo template")
        	exoPredefService.getList().success(function(data) {
        		$scope.exoPredefs = data;        		
        	});
        }
    	$scope.getExoTemplate();
        
        $scope.getExos = function (scId){
        	console.log("get exo " + scId);
        	seanceService.getSeance(scId).success(function (data) {
        		$scope.seance = data;
        		$scope.exercices = data.exercices;
//        		$scope.exoPredefs = data.seancePredef.list;
        		console.log("affichage exo");
        		$scope.affichageExo($scope.seance);
        	});
        }
        console.log(scId + " scId");
        $scope.getExos(scId);		
        
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
        /* modifie actualExo
         * - si exo non present dans les exercices de la seance en cours initialisation nouveau exo
         * - sinon recuperation de l object correspondant
         * */
        $scope.choixExo = function(exo) {
        	exerciceService.getExercice(scId, exo.id).success(function(data) {
        		$rootScope.actualExo = data; // TODO comment faire pour ne pas passer par le rootScope
        		console.log('seance ' + scId + ' exoId' + exo.id);
        		$location.path("seance/" + scId + "/exercice/" + data.id + "/serie");
        	});
        };
    	// gestion filtre exoPredef
     	$scope.initexoShown = function() {    		
    		$scope.exoShown = ["ABDO", "PECTORAUX", "JAMBE", "DOS", "MOLLET", "BRAS"];
    		$scope.exoHidden = [];
    	}
    	$scope.initexoShown();
    	
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
		};
 });

angular.module('DashboardWM').service('exerciceService', function($http) {
	
	this.getList = function(seanceId) {
		return $http.get('/v1/seance/' + seanceId + '/exercice/list');
	};
	// recupere un exercice
	this.getExercice = function(seanceId, exoId) {
		return $http.get('/v1/seance/' + seanceId + '/exercice/' + exoId);
	};
	
});