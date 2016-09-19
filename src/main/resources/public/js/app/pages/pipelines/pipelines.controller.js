'use strict';

angular.module('DashboardWM')
    .controller('PipelinesController', function ($scope, rootService) {
	  
	  
	// Refresh the grid, calling the appropriate service method.
    $scope.refreshGrid = function (page) {
	   rootService.getAll('http://localhost', page, $scope.sortInfo.fields[0], $scope.sortInfo.directions[0]).success(function (data) {

		  $scope.servicesList = data;
	   });
	   
	   	rootService.getListPackages('http://localhost').success(function(data){
		$scope.packages = data;
		});

    };

    $scope.removeXslt = function() {
	rootService.removeAllXslt('http://localhost').success(function(data){
		$scope.xsltResult = 'OK';
	});
    }

    // Do something when the grid is sorted.
    // The grid throws the ngGridEventSorted that gets picked up here and assigns the sortInfo to the scope.
    // This will allow to watch the sortInfo in the scope for changed and refresh the grid.
    $scope.$on('ngGridEventSorted', function (event, sortInfo) {
	   $scope.sortInfo = sortInfo;
    });

    // Watch the sortInfo variable. If changes are detected than we need to refresh the grid.
    // This also works for the first page access, since we assign the initial sorting in the initialize section.
    $scope.$watch('sortInfo.fields[0]', function () {
	   $scope.refreshGrid($scope.servicesList);
    }, true);

    // Initialize required information: sorting, the first page to show and the grid options.
    $scope.sortInfo = {fields: ['index'], directions: ['asc']};
    $scope.servicesList = {currentPage: 1};
    $scope.gridRestore = {
	   data: 'servicesList.restoreServices'
    };
    $scope.gridSave = {
	data: 'servicesList.saveServices'
    };
    $scope.gridPackages = {
	data: 'packages.packages'
    }
});

angular.module('DashboardWM').service('rootService', function ($http) {
    // Makes the REST request to get the data to populate the grid.
    this.getAll = function (serverName, page, sortFields, sortDirections) {
	   return $http.get( serverName + ':5555/invoke/pub/getListRestoreAndSave', {
		  params: {
			 page: page,
			 sortFields: sortFields,
			 sortDirections: sortDirections
		  }});
    }

    this.removeAllXslt = function(serverName) {
	return $http.get( serverName + ':5555/invoke/pub.xslt.Cache/removeAllTemplates?');
    }

    this.getListPackages = function(serverName) {
	return $http.get(  serverName + ':5555/invoke/pub/getListPackages?');
    }
});
