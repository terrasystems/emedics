'use strict';
/*jshint	-W117*/

angular.module('modules.dash')

	.controller('DashCtrl', function (localStorageService) {
		var vm = this;

		vm.user = localStorageService.get('userData');

		vm.tabsLabel = [{label: 'Tasks', state: 'tasks'},
			{label: 'References', state: 'ref'},
			{label: 'Notifications', state: 'notifications'},
			{label: 'Patient Forms', state: 'forms'}
		];
	}
);
