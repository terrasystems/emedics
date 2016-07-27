'use strict';
/*jshint -W117, -W097, -W116*/
angular.module('modules.dash')
	.controller('tasksEditCtrl', function ($uibModal, http, $q, $stateParams, $state, localStorageService, blockUI,
                                         $scope, alertService, $timeout, $translate, $base64, confirmService,
                                         $rootScope, DTO) {

		//if (!$stateParams.type || $stateParams.type === '' || $stateParams.type === null) {
		//	$state.go('main.private.dashboard.tasks');
		//	return;
		//}

		var vm = this;
		vm.taskId = $stateParams.id;
		vm.user = localStorageService.get('user');
		vm.Task = DTO.taskDTO();
		vm.mainState = '^';
		//vm.onNeedSave = true;

/*		if ($stateParams.type == 'tasks' || $stateParams.type == 'tasks+') {
			vm.mainState = 'main.private.dashboard.tasks';
		} else if ($stateParams.type == 'patients' || $stateParams.type == 'patients+') {
			vm.mainState = 'main.private.dashboard.patients';
		} else if ($stateParams.type == 'tasksAdmin') {
			vm.mainState = 'main.private.dashboard.tasks';
		}

		if (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go(vm.mainState);
			return;
		} else {
			vm.id = $stateParams.id;
		}*/

		//if ($stateParams.type == 'patients+' || $stateParams.type == 'tasks+') {
		//	vm.viewButtons = false;
		//	vm.viewButtonSave = false;
		//} else if ($stateParams.type == 'tasksAdmin') {
		//	vm.viewButtons = false;
		//	vm.viewButtonSave = true;
		//} else {
		//	vm.viewButtons = true;
		//	vm.viewButtonSave = true;
		//}

		//if ($stateParams.type == 'tasksAdmin') {
		//	vm.getUrl = 'private/dashboard/tasks/' + vm.id;
		//	vm.setUrl = 'private/dashboard/stuff/event/adminEdit';
		//} else {
		//	vm.getUrl = 'private/dashboard/tasks/' + vm.id;
		//	vm.setUrl = 'private/dashboard/tasks/edit';
		//}
		//
		//vm.data = { sections: [], options: [], model: [], sectionsName: [], selectedSection: '', selectedKey: '', editModel: {} };
		//
		//forEditTask.getModel(vm.getUrl, null)
		//	.then(function(res) {
		//		vm.data = res;
		//		vm.originalModel = JSON.stringify(vm.data.model);
		//		$scope.$watch('vm.data.selectedSection', function (newValue) {
		//			for (var key in vm.data.model) {
		//				if (newValue == Object.keys(vm.data.model[key])[0]) {
		//					vm.data.selectedKey = key;
		//				}
		//			}
		//		});
		//});
		//
		//function save() {
		//vm.onNeedSave = false;
		//var deferred = $q.defer();
		//var paramsPOST = DTO.editTask;
		//paramsPOST.event.id = vm.id;
		//paramsPOST.event.data.sections = vm.data.model;
		//paramsPOST.event.patient = vm.data.editModel.patient;
		//paramsPOST.event.template = vm.data.editModel.template;
		//paramsPOST.event.fromUser = vm.data.editModel.fromUser;
		//paramsPOST.event.toUser = vm.data.editModel.toUser;
		//var paramsPOST = {event: {id: vm.id, data: {sections: vm.data.model}}};
		//paramsPOST.event.patient = vm.data.editModel.patient;
		//paramsPOST.event.template = vm.data.editModel.template;
		//paramsPOST.event.fromUser = vm.data.editModel.fromUser;
		//paramsPOST.event.toUser = vm.data.editModel.toUser;


		vm.getTask = function () {
			http.get('/tasks/get/' + vm.taskId)
				.then(function (res) {
					return res.result;
				});
		};
		vm.getTask();
		//vm.Save = function () {
		//	save().then(function () {
		//		//pouch_db.save($rootScope.db, vm.data.formInfo.rawData.template.id, vm.data.formInfo, vm.data.model)
		//			.then(function() {
		//				alertService.add(0, 'Saved - Ok!');
		//				//$state.go(vm.mainState);
		//			});
		//	});
		//};

		vm.Save = function () {

			http.post('/tasks/edit', vm.Task)
				.then(function (res) {
					return res.result;
				});
		};

		vm.Send = function () {
			var config = {
				templateUrl: 'modules/modal/views/addNotification.html',
				controller: 'addNotificationCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function ($q) {
						var deferred = $q.defer();
						deferred.resolve({data: {task_id: vm.id, obj: vm.data.formInfo}});
						return deferred.promise;
					}
				}
			};


			var result = $uibModal.open(config);
			result.result.then(function () {

			});


		};

		vm.return = function () {
			$state.go(vm.mainState);
		};

		vm.CloseTask = function () {
			confirmService('Close task?')
				.then(function (res) {
					if (true === res) {
						http.get('/tasks/close/' + vm.taskId)
							.then(function (res) {
								blockUI.stop();
								alertService.success(res.state.message);
							});
					}
				});
		};

		$scope.$on('$destroy', function () {
			if (!($stateParams.type == 'patients+' || $stateParams.type == 'tasks+' || !vm.onNeedSave)) {
				if (!angular.equals(vm.originalModel, JSON.stringify(vm.data.model))) {
					confirmService('Save task?')
						.then(function () {
							save();
						});
				}
			}
		});

	});