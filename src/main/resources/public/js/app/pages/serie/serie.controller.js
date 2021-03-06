'use strict';

angular.module('DashboardWM')
    .controller('SerieController', function ($scope, $rootScope, $stateParams,$location, serieService, exerciceService, ParseLinks) {
    	var exoId = $scope.id = $stateParams.exId;
    	var scId = $scope.scId = $stateParams.scId;

    	$scope.page = 1;
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.getOldSeries(page);
        };

    	$scope.actualExo = $rootScope.actualExo;
    	
    	$scope.loadExo = function() {
    		console.log("load exo");
    		exerciceService.getExercice(scId, exoId).success(function(data) {
    			$rootScope.actualExo = $scope.actualExo = data;
    		});
//    		console.log($scope.actualExo.name + "name");
    	};
    	
    	$scope.gridSeries = {
        		data: 'actualExo.series'
        }
    	$scope.initSerie = function() {
        	$scope.serie = {};
        	$scope.serie.type = 'NORMAL';
        	$scope.serie.unilateral = '';
        	$scope.serie.nbRepeat = 10;
        	$scope.serie.leste = '';
        	$scope.serie.nbRepeat = '';
        	$scope.serie.poids = '';
        	$scope.serie.force = '';
        	$scope.serie.neg = '';
        	$scope.serie.nbSeconde = '';
        	$scope.serie.minute = '';
        	$scope.serie.comment = '';
        }
    	$scope.initSerie();

        // ajout de la serie a la liste de series de l'exercice actuel
        $scope.addSerie = function() {
        	// mise a zero du formulaire
        	console.log('teste addSerie');
        	serieService.save(scId, exoId, $scope.serie).success(function(data) {
        		$scope.serie=data;
        		console.log("numero " + data.numero);
        	});
        	$scope.serie.numero = $scope.actualExo.series.length; //TODO pourquoi numero non set precedement ?
        	$scope.actualExo.series.push($scope.serie);
        	$scope.initSerie();
        };
        
        $scope.saveSerie = function() {
        }

        
        
        /** Renvoi la liste des series/date effectue sur l'exercice */
    	$scope.getOldSeries = function(pageNumber) {
    		//parcourir les anciennes seances et recuperer les Exercices:
    		$scope.oldExoSeries = [];
    		exerciceService.getOldExercice($scope.actualExo.exoPredef.id, pageNumber).success(function(data) {
    			$scope.oldExoSeries = data.content;
        		$scope.links = ParseLinks.parse(data);
        		$scope.page = data.number;
    		});
    	};
    	
    	$scope.changeUnilateral = function() {
    		var uni = $scope.serie.unilateral;
    		if (uni == '' || null == uni) {
    			$scope.serie.unilateral = 'D';
    		} else if (uni == 'D') {
    			$scope.serie.unilateral = 'G'
    		} else {
    			$scope.serie.unilateral = '';
    		}
    	};
 
    	$scope.exerciceFinish = function() {
    		console.log("fin exo");
    		$rootScope.actualExo = {};
    		$location.path("seance/" + scId + "/exercice");
    	}
    	
    	$scope.open = function(serie) {
    		$scope.userie = serie;
    	};

		$scope.update = function() {
			console.log("update serie");
			//update d'une serie
			serieService.update(scId, exoId, $scope.userie);
			$scope.userie = {};
			$scope.loadExo();
		};

		$scope.deleteSerie = function() {
			serieService.removeSerie(scId, exoId, $scope.userie).success(function(data) {
				$scope.actualExo = data;
			});
		}
		$scope.cancel = function() {
			console.log("close modal");
    		  $scope.showModal = false;
		};

		if (!$scope.actualExo) {
    		$scope.loadExo();
    	};
    	$scope.getOldSeries(1);
    });
angular.module('DashboardWM').service('serieService', function($http) {
	// Makes the REST request to get the data to populate the grid.
	this.save = function(scId, exId, serie) {
		return $http.post('/v1/seance/'+scId+ '/exercice/'+ exId +'/serie', serie);
	}
	// Makes the REST request to get the data to populate the grid.
	this.update = function(scId, exId, serie) {
		return $http.patch('/v1/seance/'+scId+ '/exercice/'+ exId +'/serie/'+ serie.numero, serie);
	}
	this.removeSerie = function(scId, exId, serie) {
		return $http.delete('/v1/seance/'+scId+ '/exercice/'+ exId +'/serie/'+ serie.numero);
	}

	this.getList = function() {
		return $http.get('/v1/seance/s/exercice/e/serie');
	}
});
