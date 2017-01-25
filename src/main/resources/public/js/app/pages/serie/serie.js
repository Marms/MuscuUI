'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('serie', {
                parent: 'pages',
                url: '/seance/:scId/exercice/:exId/serie',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/serie/serie.html',
                        controller: 'SerieController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('serie');
                        return $translate.refresh();
                    }]
                } 
            });
    });
