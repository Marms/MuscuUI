'use strict';

angular.module('DashboardWM')
    .controller('SalleController', function ($scope, salleService,exoPredefService) {
    	var listView = $scope.listView = [
    	    "SALLE_LIST",
    	    "CREATION_SALLE"
    	];

    	// recuperation des exoType TODO voir comment limiter les appels http à getExo
    	$scope.getExo = function() {
    		exoPredefService.getList().success(function(data) {
    			$scope.templates = data;
    		});
    	};
    	$scope.getExo();
    	
    	$scope.supprime = function(id) {
    		salleService.deleteSalle(id).success(function(data){
    			$scope.findAll();
    		});
    	}
    	
    	$scope.updateSalle = function(salle) {
    		$scope.salle = salle;
    		// selection des templates present dans la salle

    		var exoSelected =[];
    		for (var i = 0; i < salle.exoTemplates.length; i++) {
    			
    			var exoTemplate = $scope.templates.filter(function(template) {
					template.id == salle.exoTemplate[i].id;
				});
    			exoSelected.push(exoTemplate);
			};
    		for (var i = 0; i < exoSelected.length; i++) {
    			exoSelected[i].selected = true;
    		}
    		$scope.changeView(1);
    	}
    	// gestion update exo type
    	
    	
    	$scope.changeView = function(index) {
    		console.log('index '+index );
    		$scope.actualView = listView[index];   
    	}
    	$scope.changeView(0);

    	$scope.showCreationSalle = function(data){
    		$scope.salle = {};
    		$scope.salle.id = '';
    		$scope.salle.name = '';
    		$scope.salle.templates = [];
    		$scope.changeView(1);
    	}
    
    	$scope.findAll = function() {
    		salleService.getList().success(function(data){
    			$scope.salles = data;
    		});
    	};
    	$scope.findAll();
    	
    	$scope.saveSalle = function(s) {
    		//recuperation des template selected
    		s.exoTemplates = $scope.templates.filter(function (template) {
    			return template.selected = true;
    		}); 
    		salleService.save(s).success(function(data) {
    			$scope.findAll();
    			$scope.changeView(0);
    		});
    	};
    });
angular.module('DashboardWM').service('salleService', function($http) {
	// Makes the REST request to get the data to populate the grid.
	this.save = function(salle) {
		return $http.post('/v1/salle', salle);
	}
	this.deleteSalle = function(id) {
		return $http.delete('/v1/salle/'+id);
	}
	this.getList = function() {
		return $http.get('/v1/salle/list');
	}
});