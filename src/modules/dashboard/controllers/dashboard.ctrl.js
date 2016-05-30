'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('DashCtrl', function ($scope, $rootScope, localStorageService, $state, $translate) {
		var vm = this;
		vm.user = localStorageService.get('userData');

		vm.tabData = [{heading: $translate.instant('TASKS'), route: 'main.private.dashboard.abstract.tasks', disable: false},
			{heading: $translate.instant('REFERENCES'), route: 'main.private.dashboard.abstract.ref', disable: false },
			{heading: $translate.instant('NOTIFICATIONS'), route: 'main.private.dashboard.abstract.notifications', disable: false },
			{heading: $translate.instant('PATIENT_FORMS'), route: 'main.private.dashboard.abstract.forms', disable: false},
			{heading: $translate.instant('PATIENTS'), route: 'main.private.dashboard.abstract.patients', disable: (vm.user.type === 'patient')}
		];
		$scope.$state = $state;

		vm.logout = function () {
			$rootScope.userData = null;
			$rootScope.token = null;
			localStorageService.set('token', null);
			localStorageService.set('userData', null);
			$state.go('main.public.login');
		};

	});
