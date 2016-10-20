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
		$scope.showSeanceList = !$scope.showSeanceList;
		$scope.showCreationForm = !$scope.showCreationForm;
		$scope.seanceTemplate.list = JSON.parse(JSON.stringify($scope.exoPredefs)); //mauvaise perf mais slice not work ??
	}
	
	$scope.showUpdateSeance = false;
	$scope.updateSeance = function() {
		$scope.showUpdateSeance = !$scope.showUpdateSeance;
		$scope.showSeanceList = !$scope.showSeanceList; // le bouton n'est visible que lorque nous somme sur la vue showSeanceList
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
		console.log(exoPredefToSelect.length);
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
		// remplacer la liste de seanceTemplate par la liste d'exoPredefs
		// $scope.seanceTemplate.list = $scope.exoPredefs;
		$scope.showUpdateSeance = !$scope.showUpdateSeance;
		$scope.showCreationForm = !$scope.showCreationForm;
	}
	$scope.getList();
	$scope.getExo();
	$scope.showSeanceList = true;
	$scope.gridSeanceTemplates = {
	   	   data: 'seanceTemplates'
	//   	   enableRowSelection: true
	};
	
	$scope.gridSeanceTemplates.columnDefs = [
		{ name: 'id', width: 50},
		{ name: 'name'}
	];
		

	
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