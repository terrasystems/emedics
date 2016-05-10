'use strict';
/*jshint	-W117*/

angular.module('modules.dash')

	.controller('DashCtrl', function ($rootScope, localStorageService, $state) {
		var vm = this;

		vm.user = localStorageService.get('userData');

		vm.tabsLabel = [{label: 'Tasks', state: 'tasks'},
			{label: 'References', state: 'ref'},
			{label: 'Notifications', state: 'notifications'},
			{label: 'Patient Forms', state: 'forms'},
			{label: 'Patients', state: 'forms'}
		];

		vm.logout = function () {
			$rootScope.userData, $rootScope.token = null;
			localStorageService.set('token', null);
			localStorageService.set('userData', null);
			$state.go('main.public.login');
		};
	}
);
