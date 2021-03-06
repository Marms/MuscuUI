'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('tables', {
                parent: 'pages',
                url: '/tables',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/tables/tables.html',
                        controller: 'TablesController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('tables');
                        return $translate.refresh();
                    }]
                } 
            });
    });
