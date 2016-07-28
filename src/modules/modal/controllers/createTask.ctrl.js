'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('CreateTaskCtrl', function ($uibModalInstance, DTO, model, blockUI, alertService, http, localStorageService) {
		var vm = this;
		vm.user = localStorageService.get('user');
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


		vm.FindTemplates = function () {

			return http.post('/mytemplates/all', DTO.criteriaDTO())
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						vm.templates = res.result;
						return res.result;
					}
				});

		};

		vm.Create = function(){

		};

	});