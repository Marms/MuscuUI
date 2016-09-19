'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('pipelines', {
                parent: 'pages',
                url: '/pipelines',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/pipelines/pipelines.html',
                        controller: 'PipelinesController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('pipelines');
                        return $translate.refresh();
                    }]
                } 
            });
    });
