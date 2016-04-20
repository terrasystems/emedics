'use strict';

angular.module('modules.core')

.constant('statesList', [
		{
			name: 'main',
			url: '',
			abstract: true,
			views: {
				'main': {
					templateUrl: 'modules/core/views/main.html',
					controller: 'MainController'
				},
				'footer@main': {
					templateUrl: 'modules/core/views/footer.html'
				}
			}
		},
		// public
		{
			name: 'main.public',
			url: '/',
			abstract: true
		},
		{
			name: 'main.public.login',
			url: '/login',
			templateUrl: 'modules/public/views/login.html',
			controller: 'LoginCtrl'

		},

		// private
		{
			name: 'main.private',
			url: '/',
			abstract: true,
			parent: 'main',
			views: {
				'header@main': {
					templateUrl: 'modules/core/views/header.html',
					controller: 'HeaderController'
				},
				'footer@main': {
					template: '<p>!!!!</p>'
				}
			}
		}, {
			name: 'main.private.dashboard'
		}

	]);
