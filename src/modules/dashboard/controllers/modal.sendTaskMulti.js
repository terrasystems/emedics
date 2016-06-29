'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('modalSendTaskMultiCtrl', function ($uibModalInstance, model, blockUI, alertService, http, localStorageService) {
		var vm = this;
		vm.model = model;
		vm.user = localStorageService.get('userData');
		vm.message = {template: model.data.template_id, message: '', patients:[]};
		vm.patients = [];

		http.get('private/dashboard/patients')
			.then(function (res) {
				blockUI.stop();
				if (res.result && angular.isArray(res.result)) {
					vm.patients = res.result;
				}
			});


		vm.onSend = function () {
			http.post('private/dashboard/tasks/multipleSend', vm.message)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
					$uibModalInstance.close(res);
				}, function (error) {
					$uibModalInstance.close(error);
					deferred.reject(error);
				});
		};

	});