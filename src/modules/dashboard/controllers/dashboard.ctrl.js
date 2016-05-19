'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('DashCtrl', function ($rootScope, localStorageService, $state) {
		var vm = this;
		vm.user = localStorageService.get('userData');

		vm.tabsLabel = [{label: 'Tasks', state: 'tasks', show: true },
			{label: 'References', state: 'ref', show: true },
			{label: 'Notifications', state: 'notifications', show: true },
			{label: 'Patient Forms', state: 'forms', show: true },
			{label: 'Patients', state: 'forms', show: (vm.user.type !== 'patient') }
		];

		vm.logout = function () {
			$rootScope.userData, $rootScope.token = null;
			localStorageService.set('token', null);
			localStorageService.set('userData', null);
			$state.go('main.public.login');
		};

	});
