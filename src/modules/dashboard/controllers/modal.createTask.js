'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('modalCreateTaskCtrl', function ($uibModalInstance, model, blockUI, alertService, http, localStorageService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.message = {template: '', message: '', patients:[]};
		vm.myForms = [];
		vm.patients = [];
		vm.isMulti = false;

		http.get('private/dashboard/user/template')
			.then(function (res) {
				blockUI.stop();
				if (res.state) {
					vm.myForms = res.result;
				}
			});

		if (vm.user.type==='doctor') {
			http.get('private/dashboard/patients')
				.then(function (res) {
					blockUI.stop();
					if (res.result && angular.isArray(res.result)) {
						vm.patients = res.result;
					}
				});
		}

		vm.onSelected = function(item) {
			vm.isMulti = vm.user.type==='doctor' &&  item.templateDto.typeEnum==='PATIENT';
		};

		vm.onCreate = function () {
			if  (vm.isMulti) {
				http.post('private/dashboard/tasks/multipleSend', vm.message)
					.then(function (res) {
						blockUI.stop();
						if (res.state) {
							alertService.add(0, res.state.message);
						}
						$uibModalInstance.close(res);
					});
			} else {
				var paramsPOST = {
					template: {id: vm.message.template, type: null, description: null, templateDto: null	},
					patient: vm.user.id,
					data: "{}"
				};
				http.post('private/dashboard/tasks/create', paramsPOST)
					.then(function (res) {
						blockUI.stop();
						alertService.add(0, res.state.message);
						$uibModalInstance.close(res);
					});
			}
		};

	});