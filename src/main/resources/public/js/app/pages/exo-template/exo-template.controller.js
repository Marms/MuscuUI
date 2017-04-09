'use strict';

angular.module('DashboardWM')
    .controller('ExoTemplateController', function ($scope, exoPredefService) {
    	var listView = $scope.listView = [
            "LISTE_EXO_TEMPLATE",
            "CREATE_UPDATE_EXO_TEMPLATE"
	    ];

    	var typeExo = $scope.typeExo = [           
	    	{id:"0", value : "ABDO"},
			{id:"1", value : "PECTORAUX"},
			{id:"2", value : "JAMBES"},
			{id:"3", value : "DOS"},
			{id:"4", value : "MOLLET"},
			{id : "5", value : "BRAS"},
			{id : "6", value : "EPAULES"}
		];
    	//affiche tout les exo
		
    	$scope.initexoShown = function() {    		
    		$scope.exoShown = ["ABDO", "PECTORAUX", "JAMBES", "DOS", "MOLLET", "BRAS", "EPAULES"];
    		$scope.exoHidden = [];
    	}
    	
    	$scope.initexoShown();
    	$scope.changeView = function(index) {
    		console.log("change view " + listView[index]);
    		$scope.actualView = listView[index];
    	}
    	$scope.changeView(0);
    	
        $scope.getList = function() {
    		exoPredefService.getList().success(function(data) {
    			$scope.exoTemplates = data;
    		});
    	};
    	
    	$scope.hideExo = function(id) {
    		var index = $scope.exoShown.indexOf(id);
    		if (index >= 0) {
    			$scope.exoShown.splice(index, 1);
    			$scope.exoHidden.push(id);
    		}
    		console.log("exoShown " + $scope.exoShown);
    	}
    	$scope.showExo = function(exo) {
    		var index = $scope.exoHidden.indexOf(exo);
    		if (index >= 0) {
    			$scope.exoHidden.splice(index,1);
    		}
    		$scope.exoShown.push(exo);
    	}
    	/** renvoi vrai si le type exo est egale au exo a voir*/
    	$scope.showLine = function(e) {
    		if (e.type.length == 0) {
    			// cas des exo n'ayant pas de type definie
    			return true;
    		}
    		for (var i =0; i < e.type.length ; i++) {
    			if ($scope.exoShown.indexOf(e.type[i]) >= 0) {
    				return true;
    			}
    		}
    		return false;
    	}
 
  	   $scope.submitCreateExoTemplate = function() {
			exoPredefService.saveExoPredef($scope.exoTemplate).success(function(data){
				$scope.getList();
				$scope.changeView(0);
				$scope.exoTemplate = {};
			});
	    }
  	   
  	   $scope.updateExoTemplate = function(e) {
  		   $scope.exoTemplate = e;
  		   $scope.changeView(1);
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
