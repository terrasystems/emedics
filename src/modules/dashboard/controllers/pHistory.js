'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('pHistoryCtrl', function (localStorageService, DTO, $stateParams, $state, blockUI, http, $q, $uibModal, alertService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.templates = [];

		if (!$stateParams.patient || $stateParams.patient === '' || $stateParams.patient === null) {
			$state.go('main.private.dashboard.abstract.patients');
			return;
		}
		vm.patient = $stateParams.patient;
		vm.item = $stateParams.obj;

		vm.onReturn = function () {
			$state.go('main.private.dashboard.abstract.patients.templates', {
				id: vm.patient.id,
				name: vm.patient.name,
				email: vm.patient.email,
				phone: vm.patient.phone
			});
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().replace(',', ' / ');
		};

		vm.onView = function (histId, patientId) {
			$state.go('main.private.dashboard.abstract.patients.edit', {id: histId, type: 'patients+', patId: patientId});
		};

		vm.onSend = function (obj, hist) {
			var model = {templ_id: obj.id, obj: obj};

			blockUI.start();
			var result = $uibModal.open({
				templateUrl: 'modules/dashboard/views/modal.addNotif.html',
				controller: 'modalAddNotifCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function ($q) {
						var deferred = $q.defer();
						deferred.resolve({
							data: model, patient: {
								'name': hist.patient.username,
								'email': hist.patient.email,
								'id': hist.patient.id
							}
						});
						return deferred.promise;
					}
				}
			}).result;
		};

		vm.onCopyTask = function (taskObj, patientId) {
			var paramsPOST = DTO.copyTask;

			paramsPOST.template.id = taskObj.template.id;
			paramsPOST.template.templateDto.id = taskObj.template.id;
			paramsPOST.patient = patientId;
			paramsPOST.data = '{}';

			http.post('private/dashboard/tasks/create', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.state && res.state.value && !!res.state.value) {
						var newTaskID = res.result.id;

						var taskEdit = DTO.taskEdit;

						taskEdit.event.id = newTaskID;
						taskEdit.event.patient = taskObj.patient;
						taskEdit.event.template = taskObj.template;
						taskEdit.event.data = taskObj.data;
						taskEdit.event.fromUser = taskObj.fromUser;
						taskEdit.event.toUser = taskObj.toUser;
						taskEdit.event.descr = taskObj.descr;

						http.post('private/dashboard/tasks/edit', taskEdit)
							.then(function (res) {
								blockUI.stop();
								if (res.result) {
									alertService.add(0, res.state.message);
									newTaskID = res.result.id;
									$state.go('main.private.dashboard.abstract.patients.edit', {
										id: newTaskID,
										type: 'patients',
										patId: patientId
									});
								}
							});
					} else {
						alertService.add(2, res.state.message);
					}
				});
		};

		vm.onEditTask = function (histId, patientId) {
			$state.go('main.private.dashboard.abstract.patients.edit', {id: histId, type: 'patients', patId: patientId});
		};

	});
