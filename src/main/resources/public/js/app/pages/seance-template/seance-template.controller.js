'use strict';

angular.module('DashboardWM').controller('SeanceTemplateController', function($scope, seancePredefService, exoPredefService) {
	var listView = $scope.listView = [
      "SEANCE_LIST",
      "CREATION_SEANCE",
      "UPDATE_SEANCE"
  	];

	$scope.changeView = function(index) {
		$scope.actualView = listView[index];
	}
	$scope.changeView(0);

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
		});
		$scope.shangeView(0);
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
	
	$scope.showCreationSeance = function() {
		$scope.seanceTemplate = {};
		$scope.changeView(1);
		$scope.seanceTemplate.list = JSON.parse(JSON.stringify($scope.exoPredefs)); //mauvaise perf mais slice not work ??
	}

	$scope.selectionSeance = function(seance) {
		// cas ou on selectionne une deuxieme fois la seance 
		var listChecked  = seance.list.filter(function(data) {
			return data.isChecked;
		});
		if (listChecked.length > 0) {
			console.log(listChecked.length + ' list Checked size');
			seance.list = listChecked;
		}
		$scope.seanceTemplate = seance;
		var exoPredefToSelect = seance.list;
		$scope.seanceTemplate.list = JSON.parse(JSON.stringify($scope.exoPredefs)); //mauvaise perf mais slice not work ?? 
		// pour chaque exercice contenu dans la list mettre donne dans exoPredefs
		for (var pas = 0; pas < exoPredefToSelect.length; pas++) {
			var temp = $scope.seanceTemplate.list.filter(function(data) {
				return data.id == exoPredefToSelect[pas].id;
			})[0];
			console.log('pas ' + pas + 'temp ' + temp.name);
			temp.isChecked = false;
			$scope.selectionner(temp);
		};
		$scope.changeView(1);
	}
	$scope.getList();
	$scope.getExo();

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