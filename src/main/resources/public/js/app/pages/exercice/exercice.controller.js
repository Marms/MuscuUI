'use strict';

angular.module('DashboardWM')
    .controller('ExerciceController',function ($scope, $rootScope, $stateParams, $location, seanceService, exerciceService, exoPredefService) {
    	var EXO_DONE = "panel-red";
    	var exoTemplateId = $stateParams.exoTemplateId;
    	var exoId = $scope.id = $stateParams.exoId;
    	var scId = $scope.scId = $stateParams.scId;
    	// RECUPERATION DES DONNEES
        $scope.getExoTemplate = function() {
        	exoPredefService.getList().success(function(data) {
        		$scope.exoPredefs = data;        		
        	});
        }
        
        $scope.getExos = function (scId){
        	seanceService.getSeance(scId).success(function (data) {
        		$scope.seance = data;
        		$scope.exercices = data.exercices;
        		$scope.exoPredefs = data.seancePredef.list;
        		$scope.affichageExo($scope.seance);
        	});
        }
        $scope.getExos(scId);		
        
        /** if ($scope.exercices.length = 0) {
        	$scope.exos = $scope.exoPredefs;
        } else {
        	$scope.exos = $scope.exercices;
        } */
  //      $scope.exos = $scope.seance.seancePredef.list;
        
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

        // FUNCTION DE L APPLICATION
        $scope.choixSeance = function(seanceTemplate) {
        	$scope.seance = {};
        	$scope.seance.seancePredef = seanceTemplate;
        	$scope.seance.exercices = []; //init liste vide
        	$scope.affichageExo($scope.seance);
        	$scope.changeView(2);
        }
 });

angular.module('DashboardWM').service('exerciceService', function($http) {
	// sauvegarde ou maj un exercice.
	this.save = function(seanceId, exercice) {
		return $http.post('/v1/seance/' + seanceId + '/exercice', exercice);
	};
	this.getList = function(seanceId) {
		return $http.get('/v1/seance/' + seanceId + '/exercice/list');
	};
	// recupere un exercice
	this.getExercice = function(seanceId, exoId) {
		return $http.get('/v1/seance/' + seanceId + '/exercice/' + exoId);
	};
	
});

