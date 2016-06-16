'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksCtrl', function ($state, blockUI, http, localStorageService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.page = {};
		vm.list = [];

		http.get('private/dashboard/tasks/all')
			.then(function (res) {
				blockUI.stop();
				if (res.result) {
					vm.list = res.result;
					vm.page = res.page;
				}
			});

		vm.onClick = function (index) {
			$state.go('main.private.dashboard.abstract.tasks.edit', {id: index, type: 'tasks', patId: null});
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().replace(',', ' / ');
		};

});