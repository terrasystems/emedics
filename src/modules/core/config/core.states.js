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
			templateUrl: 'modules/core/views/main.public.html',
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
					console.log('...befor login state');
			}
		},
		{
			name: 'main.public.registration',
			url: 'registration',
			views: {
				'content@main': {
					templateUrl: 'modules/public/views/registration.html',
					controller: 'Registration as vm'
				}
			},
			onEnter: function($rootScope, $stateParams) {
				console.log('...befor registration state');
			}
		},
		{
			name: 'main.public.newpassword',
			url: 'newpassword',
			views: {
				'content@main': {
					templateUrl: 'modules/public/views/newpassword.html',
					controller: 'NewPassword as vm'
				}
			},
			onEnter: function($rootScope, $stateParams) {
				console.log('...befor newpassword state');
			}
		},
		// private
		{
			name: 'main.private',
			url: '/',
			templateUrl: 'modules/dashboard/views/dashboard.html',
			abstract: true
		},
		{
			name: 'main.private.dashboard',
			url: 'dashboard',
			views: {
				'content@main': {
					templateUrl: 'modules/dashboard/views/dashboard.html',
					controller: 'DashboardCtrl as vm'
				}
			}
		}
		,
		{
			name:'main.private.dashboard.dashboardTabs',
			url:'tabs',
			views:{
				'content@main':{
					templateUrl:'modules/dashboard/views/dashboardTabs.html',
					controller:'dashboardTabsCtrl as vm'
				}
			}
		}

	]);


