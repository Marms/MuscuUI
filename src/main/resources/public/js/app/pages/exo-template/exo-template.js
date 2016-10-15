'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('exo-template', {
                parent: 'pages',
                url: '/exo-template',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/exo-template/exo-template.html',
                        controller: 'ExoTemplateController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('exo-template');
                        return $translate.refresh();
                    }]
                } 
            });
    });
