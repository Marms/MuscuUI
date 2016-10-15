'use strict';

angular.module('DashboardWM')
    .controller('ExoTemplateController', function ($scope, exoPredefService) {
    	$scope.getList = function() {
    		exoPredefService.getList().success(function(data) {
    			$scope.exoTemplates = data;
    		});
    		
    	}
  	   $scope.submitCreateExoTemplate = function() {
			exoPredefService.saveExoPredef($scope.exoTemplate).success(function(data){
				$scope.getList()
			});
	    }
    	
  	   $scope.getList();
  	   $scope.gridExoTemplates = {
  	   	   data: 'exoTemplates'
       };
  	   
    });
 
angular.module('DashboardWM').service('exoPredefService', function ($http) {
    // Makes the REST request to get the data to populate the grid.
    this.saveExoPredef = function (exoPredef) {
	   return $http.post('/v1/exopredef', exoPredef);
    }

    this.getList = function() {
	return $http.get( '/v1/exopredef/list');
    }

    this.getListPackages = function(serverName) {
	return $http.get(  serverName + ':5555/invoke/pub/getListPackages?');
    }
});
