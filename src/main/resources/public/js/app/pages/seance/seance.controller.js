'use strict';

angular.module('DashboardWM')
    .controller('SeanceController', function ($scope, $location, seanceService, seancePredefService, exoPredefService) {
    	var listView = $scope.listView  = [
    	    "LISTE_SEANCE",
    		"LISTE_SEANCE_PREDEF"
    	];
    	
    	$scope.changeView = function(index) {
    		console.log("view " + listView[index]);
    		$scope.actualView = listView[index];
    	}

    	$scope.changeView(0);

    	// RECUPERATION DES DONNEES
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
        	console.log("creation d une seance");
        	$scope.seance = {};
        	$scope.seance.seancePredef = seanceTemplate;
        	$scope.seance.exercices = []; //init liste vide
        	seanceService.save($scope.seance).success(function(data) {
        		$scope.updateSeance(data);
        	});
        }

        $scope.updateSeance = function(s) {
        	console.log("update d une seance");
        	$location.path("/seance/"+s.id + "/exercice");
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
    	
//    	$scope.open = function($event) {
//             $event.preventDefault();
//             $event.stopPropagation();
//
//             $scope.obj = {
//                  opened : true
//             };
//       };
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