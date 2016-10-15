'use strict';

angular.module('DashboardWM').controller('SeanceTemplateController', function($scope, seancePredefService, exoPredefService) {

	$scope.seanceTemplate= {};
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
		$scope.seanceTemplate.list =$scope.seanceTemplate.list.filter(function(exo) {
			return exo.isChecked;
		});
		
 		seancePredefService.save($scope.seanceTemplate).success(function(data) {
			$scope.getList();
			$scope.showList();
		});
	};

	$scope.selectionner = function(exo) {
		exo.isChecked = !exo.isChecked;
		if (exo.isChecked) {
			exo.ngClass = "panel-red";
		} else {
			exo.ngClass = "panel-primary";
		}
		console.log('selectionne '+ ' id ' + exo.id + ' ' + exo.isChecked)
	}
	
	$scope.showList = function() {
		$scope.seanceTemplate = {};
		$scope.seanceTemplate.list = JSON.parse(JSON.stringify($scope.exoPredefs)); //mauvaise perf mais slice not work ??
		$scope.showSeanceList = !$scope.showSeanceList;
		$scope.showCreationForm = !$scope.showCreationForm;
	}
	$scope.getList();
	$scope.getExo();
	$scope.showSeanceList = true;
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