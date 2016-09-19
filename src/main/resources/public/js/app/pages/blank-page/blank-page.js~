'use strict';

angular.module('DashboardWM')
    .config(function ($stateProvider) {
        $stateProvider
            .state('blankPage', {
                parent: 'pages',
                url: '/blankPage',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'js/app/pages/blank-page/blank-page.html',
                        controller: 'BlankPageController'
                    }
                },
                 resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('blankPage');
                        return $translate.refresh();
                    }]
                } 
            });
    });
