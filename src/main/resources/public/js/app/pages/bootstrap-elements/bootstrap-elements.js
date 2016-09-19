'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('bootstrapElements', {
                parent: 'pages',
                url: '/bootstrapElements',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/bootstrap-elements/bootstrap-elements.html',
                        controller: 'BootstrapElementsController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('bootstrap-elements');
                        return $translate.refresh();
                    }]
                } 
            });
    });
