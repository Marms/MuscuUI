'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('pages', {
                abstract: true,
                parent: 'site'
            });
    });
