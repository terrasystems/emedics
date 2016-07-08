'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('modalCreateTaskCtrl', function ($uibModalInstance, model, blockUI, alertService, http, localStorageService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.message = {template: '', message: '', patients:[], assignAll: false};
		vm.myForms = [];
		vm.patients = [];
		vm.isMulti = false;

		vm.getFindUsers = function (val) {
			if  (val==='') { return []; }
			return http.post('private/dashboard/patients', {name: val})
				.then(function (res) {
					blockUI.stop();
					if  (angular.isArray(res.result) && res.result.length>0) {
						res.result.unshift( { name: '<< To ALL PATIENTS >>', email: '', id: 'ALL' } );
					}
					vm.patients = res.result;
					return res.result;
				});
		};

		vm.onSelectCallback = function (item, model) {
			if (model === 'ALL') {
				vm.message.patients = ['ALL'];
				vm.message.assignAll = true;
			}
		};

		vm.onRemoveCallback= function (item, model) {
			if (model === 'ALL') {
				vm.message.assignAll = false;
			}
		};

		http.get('private/dashboard/user/template')
			.then(function (res) {
				blockUI.stop();
				if (res.state) {
					if (angular.isArray(res.result) && res.result.length > 0) {
						res.result.map(function (item) {
							item.name = item.templateDto.name;
							return item;
						});
					}
					vm.myForms = res.result;
				}
			});

		vm.onSelected = function(item) {
			vm.isMulti = vm.user.type==='doctor' &&  item.templateDto.typeEnum==='PATIENT';
		};

		vm.onCreate = function () {
			if  (vm.isMulti) {
				if  (vm.message.assignAll === true) {
					vm.message.patients = [];
				}
				http.post('private/dashboard/tasks/multipleCreate', vm.message)
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
					}, function (error) {
						$uibModalInstance.close(error);
						deferred.reject(error);
					});
			}
		};

	});