'use strict';

angular.module('DashboardWM').controller('SeanceTemplateController', function($scope, seancePredefService, exoPredefService) {

	$scope.getExo = function() {
		exoPredefService.getList().success(function(data) {
			$scope.exoPredefs = data;
		});
	};

	$scope.getList = function() {
		seancePredefService.getList().success(function(data) {
			$scope.seanceTemplates= data;
		});
	};

	$scope.createSeanceTemplate = function() {
		seancePredefService.save($scope.seanceTemplate).success(function(data) {
			$scope.getList();
		});
	};

	$scope.getList();
	$scope.getExo();

	$scope.gridSeanceTemplates = {
	   	   data: 'seanceTemplates'
    };

	
});

angular.module('DashboardWM').service('seancePredefService', function($http) {
	// Makes the REST request to get the data to populate the grid.
	this.save = function(seancePredef) {
		return $http.post('/v1/seancepredef', seancePredef);
	}

	this.getList = function() {
		return $http.get('/v1/seancepredef/list');
	}
});