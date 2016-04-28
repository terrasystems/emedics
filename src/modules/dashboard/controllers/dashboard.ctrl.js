'use strict';
/*jshint	-W117*/

angular.module('modules.dash')

	.controller('DashCtrl', function ($http, alertService) {
		//console.log('..DashCtrl');
		var vm = this;

		vm.tabsLabel = [{label: 'Tasks', state: 'tasks'},
			{label: 'References', state: 'ref'},
			{label: 'Notifications', state: 'notifications'},
			{label: 'Patient Forms', state: 'forms'}
		];
	}
);
