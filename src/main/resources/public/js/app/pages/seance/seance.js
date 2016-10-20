'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('seance', {
                parent: 'pages',
                url: '/seance',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/seance/seance.html',
                        controller: 'SeanceController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('seance');
                        return $translate.refresh();
                    }]
                } 
            });
    });
