'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('seance-template', {
                parent: 'pages',
                url: '/seance-template',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/seance-template/seance-template.html',
                        controller: 'SeanceTemplateController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('seance-template');
                        return $translate.refresh();
                    }]
                } 
            });
    });
