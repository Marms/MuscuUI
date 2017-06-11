'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('salle', {
                parent: 'pages',
                url: '/salle',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/salle/salle.html',
                        controller: 'SalleController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('salle');
                        return $translate.refresh();
                    }]
                } 
            });
    });
