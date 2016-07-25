'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('CreateTaskCtrl', function ($uibModalInstance, DTO, model, blockUI, alertService, http, localStorageService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.message = {template: '', message: '', patients: [], assignAll: false};
		vm.myForms = [];
		vm.patients = [];
		vm.isMulti = false;

		vm.FindPatients = function (val) {
			if (val === '') {
				return [];
			}

			var criteriaDTO = DTO.criteriaDTO();

			criteriaDTO.search = val;

			return http.post('/patients/all', criteriaDTO)
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result) && res.result.length > 0) {
						res.result.unshift({name: 'To ALL PATIENTS', email: '', id: 'ALL'});
					}
					vm.patients = res.result;
					return res.result;
				});
		};

		vm.SelectCallback = function (item, model) {
			if (model === 'ALL') {
				vm.message.patients = ['ALL'];
				vm.message.assignAll = true;
			}
		};

		vm.RemoveCallback = function (item, model) {
			if (model === 'ALL') {
				vm.message.assignAll = false;
			}
		};

		http.post('/mytemplates/all', DTO.criteriaDTO())
			.then(function (res) {
				blockUI.stop();
				if (res.state) {
					vm.myForms = res.result;
				}
			});

		//vm.Selected = function (item) {
		//	vm.isMulti = (vm.user.type === 'doctor' || vm.user.type === 'stuff') && item.templateDto.typeEnum === 'PATIENT';
		//};

		//vm.onCreate = function () {
		//	if (vm.isMulti) {
		//		if (vm.message.assignAll === true) {
		//			vm.message.patients = [];
		//		}
		//		http.post('private/dashboard/tasks/multipleCreate', vm.message)
		//			.then(function (res) {
		//				blockUI.stop();
		//				if (res.state) {
		//					alertService.add(0, res.state.message);
		//				}
		//				$uibModalInstance.close(res);
		//			});
		//	} else {
		//		var paramsPOST = {
		//			template: {id: vm.message.template, type: null, description: null, templateDto: null},
		//			patient: vm.user.id,
		//			data: "{}"
		//		};
		//		http.post('private/dashboard/tasks/create', paramsPOST)
		//			.then(function (res) {
		//				blockUI.stop();
		//				alertService.add(0, res.state.message);
		//				$uibModalInstance.close(res);
		//			}, function (error) {
		//				$uibModalInstance.close(error);
		//			});
		//	}
		//};

	});