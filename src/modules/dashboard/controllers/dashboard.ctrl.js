'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('DashCtrl', function ($rootScope, localStorageService, $state) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.tabData = [{heading: 'Tasks', route: 'main.private.dashboard.abstract.tasks', disable: false},
			{heading: 'References', route: 'main.private.dashboard.abstract.ref', disable: false },
			{heading: 'Notifications', route: 'main.private.dashboard.abstract.notifications', disable: false },
			{heading: 'Patient Forms', route: 'main.private.dashboard.abstract.forms', disable: false},
			{heading: 'Patients', route: 'main.private.dashboard.abstract.forms', disable: (vm.user.type !== 'patient')}
		];

		vm.logout = function () {
			$rootScope.userData, $rootScope.token = null;
			localStorageService.set('token', null);
			localStorageService.set('userData', null);
			$state.go('main.public.login');
		};

	});
