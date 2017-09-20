/* globals $ */
'use strict';

angular.module('DashboardWM')
    .directive('simplePager', function() {
        return {
        	replace: true,
            templateUrl: 'js/components/directives/pager.html'
        };
    });
