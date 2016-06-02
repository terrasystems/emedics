'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksCtrl', function ($scope, $rootScope,constants,$stateParams,$state, blockUI, http, localStorageService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.page = {};
		vm.list = [];

		var paramsPOST = {"page": {"start": 0, "count": 20}, "criteria": {}};

		http.post('private/dashboard/' + vm.user.type + '/forms/active', paramsPOST)
			.then(function (res) {
				blockUI.stop();
				if (res.result) {
					vm.list = res.result;
					vm.page = res.page;
				}
			});


		vm.onClick = function (index) {
			$state.go('main.private.dashboard.abstract.tasks.edit', {number: index, type: 'tasks', patId: null});
		};

});



