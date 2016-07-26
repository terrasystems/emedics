'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')
	.controller('patientsHistoryCtrl', function (localStorageService, DTO, $stateParams, $state, blockUI, http, $q, $uibModal, alertService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.templates = [];

		if (!$stateParams.patient || $stateParams.patient === '' || $stateParams.patient === null) {
			$state.go('main.private.dashboard.patients');
			return;
		}
		vm.patient = $stateParams.patient;
		vm.item = $stateParams.obj;

		vm.onReturn = function () {
			$state.go('main.private.dashboard.patients.templates', {
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
			$state.go('main.private.dashboard.patients.editor', {id: histId, type: 'patients+', patId: patientId});
		};

		vm.onSend = function (obj, hist) {
			var model = {templ_id: obj.id, obj: obj};

			blockUI.start();
			var result = $uibModal.open({
				templateUrl: 'modules/modal/views/addNotification.html',
				controller: 'addNotificationCtrl',
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
			var taskDTO = DTO.taskDTO();
			taskDTO.patient = taskObj.patient;
			taskDTO.template = taskObj.template;
			taskDTO.model = taskObj.data;
			taskDTO.fromUser = taskObj.fromUser;
			taskDTO.toUser = taskObj.toUser;
			taskDTO.descr = taskObj.descr;
			http.post('/tasks/create', taskDTO)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						alertService.success(res.state.message);
						$state.go('main.private.dashboard.patients.editor', {
							id: res.result.id,
							type: 'patients',
							patId: patientId
						});
					} else {
						alertService.error(res.state.message);
					}
				});
		};

		vm.onEditTask = function (histId, patientId) {
			$state.go('main.private.dashboard.patients.editor', {id: histId, type: 'patients', patId: patientId});
		};

	});