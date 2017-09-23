'use strict';

angular.module('DashboardWM')
	.directive('saisieSerie', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: // {} = isolate, true = child, false/undefined = no change
		{
			serie: '=',
			addSerie: '&',
			update: '&',
			affichageModal: '=',
			changeUnilateral: '&'
		},
		controller: function($scope, $element, $attrs, $transclude) {
			var tab = [ "numero", "repetition", "poids", "unilateral",
	    	            "minute", "seconde", "leste", "neg",
	    	            "force", "comment"];
	    	 $scope.isNumInArray = function(num, array) {
	    		for(var i = 0; i < array.length; i ++) {
	    			if (num === array[i]) {
	    				return true;
	    			}
	    		}return false;
	    	}
	    	$scope.change = function(type, serie) {
	    		if (type === 'F') {
	    			if (serie.forcer === '') {
	    				serie.forcer = 'forcé';
	    			}
	    			else {
	    				serie.forcer = '';
	    			}
	    		}
	    		else if (type === 'N') {
	    			if (serie.neg === '') {
	    				serie.neg= 'neg';
	    			}
	    			else {
	    				serie.neg = '';
	    			}
	    		}
	    	}
	        $scope.showDiv = function (num) {
	        	if ($scope.serie != null) {
		        	if ($scope.serie.type === 'TRACTIONS') {
		        		return $scope.isNumInArray(num, [1,2,3,7,8,9,10]);
		        	}
		        	if ($scope.serie.type === 'TIME') {
		        		return $scope.isNumInArray(num, [1,4,5,6,7,10]);
		        	}
		        	if ($scope.serie.type === 'PDC') {
		        		return $scope.isNumInArray(num, [1,2,7,8,9,10]);
		        	}
	        	} else {
	        		console.log("serie is null");
	        	}
	        	/* NORMAL  */
	       		return $scope.isNumInArray(num, [1,2,3,4,10]);
	       	};
	       	
	       	$scope.changeTypeExo = function(type) {
	       		$scope.serie.type = type;
	       	};
		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: 'js/app/pages/serie/serieNotation.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function postLink(scope, iElm, iAttrs, controller) {
			scope.save = function () {
				scope.addSerie();
			}


		}
	}
	
})