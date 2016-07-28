'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('assignTaskCtrl', function ($uibModalInstance, model, blockUI, alertService, $timeout, http, localStorageService) {
		var vm = this;
		vm.model = model;
		vm.user = localStorageService.get('user');
		vm.Assign = function () {
			vm.message.stuffId = vm.toUser.id;
			http.post('private/dashboard/stuff/assignTask', vm.message)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.success(res.state.message);
					}
					$uibModalInstance.close(res);
				});
		};


	});