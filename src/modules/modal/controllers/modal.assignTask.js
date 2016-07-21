'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('modalAssignTaskCtrl', function ($uibModalInstance, model, blockUI, alertService, $timeout, http, localStorageService, $scope, $q) {
		var vm = this;
		vm.model = model;
		vm.user = localStorageService.get('userData');
		vm.message = {stuffId: '', eventId: vm.model.data.task_id};

		vm.onAssign = function () {
			vm.message.stuffId = vm.toUser.id;
			http.post('private/dashboard/stuff/assignTask', vm.message)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
					$uibModalInstance.close(res);
				});
		};


	});