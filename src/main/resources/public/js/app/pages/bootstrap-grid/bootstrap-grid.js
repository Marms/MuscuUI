'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('bootstrapGrid', {
                parent: 'pages',
                url: '/bootstrapGrid',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/bootstrap-grid/bootstrap-grid.html',
                        controller: 'BootstrapGridController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('bootstrapGrid');
                        return $translate.refresh();
                    }]
                } 
            });
    });
