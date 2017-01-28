'use strict';

angular.module('DashboardWM')
    .controller('SerieController', function ($scope, $rootScope, $stateParams,$location, serieService) {
    	var exoId = $scope.id = $stateParams.exId;
    	var scId = $scope.scId = $stateParams.scId;

    	$scope.actualExo = $rootScope.actualExo;

    	$scope.gridSeries = {
        		data: 'actualExo.series'
        }
    	$scope.initSerie = function() {
        	console.log("initSerie");
        	$scope.serie = {};
        	$scope.serie.nbRepeat = 10;
        }
    	$scope.initSerie();

        // ajout de la serie a la liste de series de l'exercice actuel
        $scope.addSerie = function() {
        	// mise a zero du formulaire
        	serieService.save(scId, exoId, $scope.serie);
        	$scope.actualExo.series.push($scope.serie);
        	$scope.initSerie();
        };
        
        $scope.saveSerie = function() {
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
    	
    	$scope.exerciceFinish = function() {
    		console.log("fin exo");
    		$rootScope.actualExo = {};
    		$location.path("seance/" + scId + "/exercice");
    	}

    });
angular.module('DashboardWM').service('serieService', function($http) {
	// Makes the REST request to get the data to populate the grid.
	this.save = function(scId, exId, serie) {
		return $http.post('/v1/seance/'+scId+ '/exercice/'+ exId +'/serie', serie);
	}

	this.getList = function() {
		return $http.get('/v1/seance/s/exercice/e/serie');
	}
});
