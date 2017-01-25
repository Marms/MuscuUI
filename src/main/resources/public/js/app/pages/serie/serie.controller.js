'use strict';

angular.module('DashboardWM')
    .controller('SerieController', function ($scope, $rootScope, $stateParams) {
    	var exoId = $scope.id = $stateParams.exoId;
    	var scId = $scope.scId = $stateParams.scId;

    	$scope.exo = $rootScope.actualExo;

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
    });
angular.module('DashboardWM').service('serieService', function($http) {
	// Makes the REST request to get the data to populate the grid.
	this.save = function(seance) {
		return $http.post('/v1/seance/s/exercice/e/serie', seance);
	}

	this.getList = function() {
		return $http.get('/v1/seance/s/exercice/e/serie');
	}
});
