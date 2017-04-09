'use strict';

angular.module('DashboardWM')
	.directive('serieAffichage', function(){
	return {
		scope:
		{
			s: '='
		},
		controller: function($scope, $element, $attrs, $transclude) {

 			var text = '';
 			if ($scope.s.type === 'TRACTIONS') {
 				text = $scope.s.nbRepeat + " * " + $scope.s.poids + "KG ";
 			}
 			if ($scope.s.type === 'TIME') {
 				text = $scope.s.minute + 'min ' + $scope.s.seconde + ' sec';
 			}
 			if ($scope.s.type === 'PDC') {
 				text = $scope.s.nbRepeat + " PDC";
 			} 
 			if ($scope.s.type === 'NORMAL' || $scope.s.type == null) {
 				text = $scope.s.nbRepeat + " * " + $scope.s.poids + "KG ";
 			}
 			if ($scope.s.unilateral != null) {
 				text = text + ' ' + $scope.s.unilateral;
 			}
 			if ($scope.s.leste != '' && $scope.s.leste != null) {
 				text += ' + ' + $scope.s.leste + ' KG';
 			}
 			if ($scope.s.neg != '' && $scope.s.neg != null) {
 				text += ' neg ';
 			}
 			if ($scope.s.forcer != '' && $scope.s.forcer != null) {
 				text += ' force ';
 			}
			$scope.t = text;
		},
		template: "<div>{{t}}</div>",
		replace: true,
		link: function postLink(scope, iElm, iAttrs, controller) {
			scope.save = function () {
				scope.addSerie();
			}
		}
	}
	
})