'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('muscu', {
                parent: 'pages',
                url: '/muscu',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/muscu/muscu.html',
                        controller: 'MuscuController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('muscu');
                        return $translate.refresh();
                    }]
                } 
            });
    });
