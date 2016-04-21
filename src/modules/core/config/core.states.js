'use strict';

angular.module('modules.core')

.constant('statesList', [
		{
			name: 'main',
			url: '',
			templateUrl:'modules/core/views/main.html',
			abstract: true
		},
		// public
		{
			name: 'main.public',
			url: '/',
			template: 'modules/core/views/main.public.html',
			abstract: true
		},
		{
			name: 'main.public.login',
			url: 'login',
			views: {
				'content@main': {
					templateUrl: 'modules/public/views/login.html',
					controller: 'LoginCtrl as vm'
				}
			},
			onEnter: function($rootScope, $stateParams) {
					console.log('...befor Login state');
				}
		}

	]);
