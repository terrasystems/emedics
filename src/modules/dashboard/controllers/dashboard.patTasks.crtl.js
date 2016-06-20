'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksCtrl', function ($state, blockUI, http, localStorageService, alertService, $uibModal) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.page = {};
		vm.list = [];
		vm.history = [];

		vm.onRefreshNew = function() {
			http.get('private/dashboard/tasks/all')
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.list = res.result;
					}
				});
		};
		vm.onRefreshNew();

		vm.onRefreshHistory = function() {
			http.get('private/dashboard/tasks/gethistory')
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.history = res.result;
					}
				});
		};
		vm.onRefreshHistory();

		vm.onClickNew = function (index) {
			$state.go('main.private.dashboard.abstract.tasks.edit', {id: index, type: 'tasks', patId: null});
		};

		/*****************************/

		vm.onSendHistory = function (obj,hist) {
			var model = { templ_id: obj.id, obj: obj };

			blockUI.start();
			var result = $uibModal.open({
				templateUrl: 'modules/dashboard/views/modal.addNotif.html',
				controller: 'modalAddNotifCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function () {
						return {data:{}};
					}
				}
			}).result;
		};

		vm.onViewHistory = function (histId, patientId) {
			$state.go('main.private.dashboard.abstract.patients.edit', {id: histId, type: 'tasks+', patId: patientId});
		};

		vm.onCopyHistory = function(taskObj, patientId) {
			var paramsPOST = {
				template: {
					id: taskObj.template.id,
					templateDto: {id : taskObj.template.id}
				},
				patient: patientId
			};
			http.post('private/dashboard/tasks/create', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.state && res.state.value && !!res.state.value) {
						var newTaskID = res.result.id;
						paramsPOST = {event:
						{	id: newTaskID,
							patient: taskObj.patient,
							template: taskObj.template,
							data: taskObj.data,
							fromUser: taskObj.fromUser,
							toUser: taskObj.toUser,
							descr: taskObj.descr
						}
						};
						http.post('private/dashboard/tasks/edit', paramsPOST)
							.then(function (res) {
								blockUI.stop();
								if (res.result) {
									alertService.add(0, res.state.message);
									newTaskID = res.result.id;
									$state.go('main.private.dashboard.abstract.patients.edit', {id: newTaskID, type: 'tasks', patId: patientId});
								}
							});
					} else {
						alertService.add(2, res.state.message);
					}
				});
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().replace(',', ' / ');
		};

});