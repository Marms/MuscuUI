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

    	$scope.changeView = function(index) {
    		$scope.actualView = listView[index];
    	}

    	$scope.changeView(0);

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
        
        $scope.getSeances = function() {
        	seanceService.getList().success(function(data) {
        		$scope.seances = data;
        	});
        }
        $scope.getSeances();
        $scope.gridSeances = {
        		data: 'seances'
        };
        
        $scope.saveSeance = function() {
        	seanceService.save($scope.seance).success( function(data) {
        		$scope.seance = data;
        		$scope.seances.push($scope.seance);
        		$scope.changeView(0);
                $scope.otherExo = [];
        	});
        }

        //TODO voir pour garder seance
        $scope.choixSeance = function(seance) {
        	$scope.seance = {};
        	$scope.seance.exercices = []; //init liste vide
        	$scope.seance.seancePredef = seance;
        	$scope.changeView(2);
        }
        
        $scope.otherExo = [];
        $scope.choixOtherExo = function(exo) {
        	$scope.changeView(2);
        	$scope.otherExo.push(exo);
        	$scope.choixExo(exo);
        }
        
        $scope.choixExo = function(exo) {
        	$scope.numero = 0;
        	if (exo.done === "panel-red") {
        		$scope.actualExo = $scope.seance.exercices.filter(function(data) {
        			return data.exoPredef.id == exo.id;
        		})[0];
        		for(var serie in $scope.actualExo.series) { //TODO doesnt work 
        			if ($scope.numero < serie.numero) {
        				$scope.numero = serie.numero;
        			}
        		}
        		// Todo recuperation du numero de serie
        	} else {
        		$scope.actualExo = {};        		
        		$scope.actualExo.series = [];
        		$scope.serie = {};
        		$scope.serie.nbRepeat = 10;
        		$scope.actualExo.exoPredef = exo; //set exotemplate
        	}
        	exo.done = "panel-red";

        	$scope.changeView(4);
        	$scope.gridSeries = {
            		data: 'actualExo.series'
            }
        };
        
        // ajout de l'exercice a la seance en cour puis affichage liste exo
        $scope.saveExo = function() {
        	// determiner si maj exo ou new exo
        	$scope.seance.exercices.push($scope.actualExo);
        	$scope.changeView(2);
        };
 
        // ajout de la serie a la liste de series de l'exercice actuel
        $scope.addSerie = function(serie) {
        	$scope.serie.numero = $scope.numero;
        	$scope.numero++;
        	$scope.actualExo.series.push($scope.serie);
        	// mise a zero du formulaire
        	$scope.serie = {};
        	$scope.serie.nbRepeat=10;
        };
   
        $scope.getSeanceTemplates();
        
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