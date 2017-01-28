'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('exercice', {
                parent: 'pages',
                url: '/seance/:scId/exercice',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/exercice/exercice.html',
                        controller: 'ExerciceController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('exercice');
                        return $translate.refresh();
                    }]
                } 
            });
    });
