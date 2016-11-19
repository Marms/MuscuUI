'use strict';

var DashboardWM = angular.module(
		'DashboardWM',
		[ 'ui.router', 'ngResource', 'pascalprecht.translate', 'ngAnimate',
				'ui.bootstrap', 'ui.grid' ]).config(
		function($stateProvider, $urlRouterProvider, $httpProvider,
				$locationProvider, $translateProvider) {

			$urlRouterProvider.otherwise('/');
			$stateProvider.state('site', {
				'abstract' : true,
				views : {

					'navbar@' : {
						templateUrl : 'js/components/navbar/navbar.html'
					}

				},
				resolve : {
					translatePartialLoader : [ '$translate',
							'$translatePartialLoader',
							function($translate, $translatePartialLoader) {
								$translatePartialLoader.addPart('global');
								return $translate.refresh();
							} ]
				}
			});

			// Initialize angular-translate
			$translateProvider.useLoader('$translatePartialLoader', {
				urlTemplate : 'i18n/{lang}/{part}.json'
			});
			$translateProvider.preferredLanguage('fr');

		}).constant('ExoType', {
			Type: [// ABDO, PECTORAUX, JAMBE, DOS, MOLLET, BRAS;
			       {Id: 1, name: 'ABDO'},
			       {Id: 2, name: 'PECTORAUX'},
			       {Id: 3, name: 'JAMBE'},
			       {Id: 4, name: 'DOS'},
			       {Id: 5, name: 'MOLLET'},
			       {Id: 6, name: 'BRAS'}
			      
			       ]
			
		});
