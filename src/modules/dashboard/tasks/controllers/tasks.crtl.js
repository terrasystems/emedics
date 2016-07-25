'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('tasksCtrl', function ($state, blockUI, http, localStorageService, alertService, $uibModal, confirmService, $scope, DTO) {
		var vm = this;
		vm.user = localStorageService.get('userData');

		vm.tasksCriteriaDTO = DTO.tasksCriteriaDTO();
		vm.history = false;

		vm.changeTab = changeTab;
		vm.allTasks = allTasks;
		vm.getHistory = getHistory;


		vm.list = [];

		//vm.stafs = [];
		//
		//vm.showFilter = true;
		//vm.showFilterH = true;
		//
		vm.typeList = [{value: '0', name: 'NEW'}, {value: '2', name: 'PROCESSED'}];

		if (vm.user.type === 'patient') {
			vm.tasksCriteriaDTO.period = 4;
		}

		if (vm.user.isAdmin) {
			vm.hideAdminTasks = false;
		} else {
			vm.hideAdminTasks = true;
		}

		$scope.$watch('vm.tasksCriteriaDTO.period', function (newValue) {
			if (vm.history)
			getHistory();
			else
			allTasks();
		});

		function changeTab (index) {
			if (0===index){
				vm.history = false;
				allTasks();
			} else
			{
				vm.history = true;
				getHistory();
			}
		}

		/*********** << NEW >> ************/
		vm.onClearFilters = function() {
			vm.tasksCriteriaDTO = DTO.tasksCriteriaDTO();
		};

		vm.onApplyFilters = function() {
			allTasks();
		};

		vm.CreateTask = function () {
			var config = {
				templateUrl: 'modules/modal/views/createTask.html',
				controller: 'CreateTaskCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function ($q) {
						var deferred = $q.defer();
						deferred.resolve({});
						return deferred.promise;
					}
				}
			};
			var result = $uibModal.open(config);
			result.result.then(function () {
				vm.allTasks();
			});
		};


		function allTasks () {
			http.post('/tasks/all', vm.tasksCriteriaDTO)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.list = res.result;

						//must be delete later, only for testing
						//<<-------->>//
						vm.list.forEach(function(objects,i) {
							objects.id  = i+1;
							console.log(objects);
						});
						//<<-------->>//
					}
				});
		};
		vm.allTasks();

		vm.goToEdit = function (index) {
			$state.go('main.private.dashboard.abstract.tasks.edit', {id: index, type: 'tasks', patId: null});
		};

		vm.onAssignTask = function (id, stafs, $event) {
			if ($event) {
				$event.stopPropagation();
				$event.preventDefault();
			}
			var config = {
				templateUrl: 'modules/dashboard/views/modal.assignTask.html',
				controller: 'modalAssignTaskCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function ($q) {
						var deferred = $q.defer();
						deferred.resolve({data: {task_id: id, stafs: stafs}});
						return deferred.promise;
					}
				}
			};
			var result = $uibModal.open(config);
			result.result.then(function () {
				allTasks();
			});
		};


		function getHistory () {
			http.post('/tasks/history', DTO.criteriaDTO())
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.list = res.result;
					}
				});
		};

		vm.onSendHistory = function (obj, hist) {
			var model = {templ_id: obj.id, obj: obj};

			blockUI.start();
			var result = $uibModal.open({
				templateUrl: 'modules/modal /views/addNotification.html',
				controller: 'addNotificationCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function () {
						return {data: model};
					}
				}
			}).result;
		};

		vm.onViewHistory = function (histId, patientId) {
			$state.go('main.private.dashboard.abstract.patients.editor', {id: histId, type: 'tasks+', patId: patientId});
		};

		vm.onCopyHistory = function (taskObj, patientId) {
			var taskDTO = DTO.taskDTO;


			http.post('/tasks/create', taskDTO)
				.then(function (res) {
					blockUI.stop();
					if (res.state && res.state.value && !!res.state.value) {
						var newTaskID = res.result.id;
						taskDTO = DTO.editTask;
						taskDTO.event.id = newTaskID;
						taskDTO.event.patient = taskObj.patient;
						taskDTO.event.template = taskObj.template;
						taskDTO.event.data = taskObj.data;
						taskDTO.event.fromUser = taskObj.fromUser;
						taskDTO.event.toUser = taskObj.toUser;
						taskDTO.event.descr = taskObj.descr;

						http.post('/tasks/edit', taskDTO)
							.then(function (res) {
								blockUI.stop();
								if (res.result) {
									alertService.add(0, res.state.message);
									newTaskID = res.result.id;
									$state.go('main.private.dashboard.abstract.patients.editor', {
										id: newTaskID,
										type: 'tasks',
										patId: patientId
									});
								}
							});
					} else {
						alertService.add(2, res.state.message);
					}
				});
		};

		/*********** << STAFF >> ************/

		vm.onRefreshAdminTasks = function () {
			http.post('/staff/all', DTO.criteriaDTO())
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						if (angular.isArray(res.result) && res.result.length > 0) {
							res.result.map(function (item) {
								item.all = item.firstName + ' ' + item.lastName + ((item.email === null) ? '' : ', ' + item.email) + ((item.phone === null) ? '' : ', ' + item.phone);
								return item;
							});
						}
						vm.stafs = res.result;
					}
				});
		};
		if (vm.hideAdminTasks) {
			vm.onRefreshAdminTasks();
		}

		vm.onOpenStaff = function (id) {
			http.get('private/dashboard/stuff/' + id + '/events')
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.tasks = res.result;
					}
				});
		};

		vm.onCloseTask = function (task_id, stuff_id) {
			confirmService('Close task?')
				.then(function (res) {
					http.get('private/dashboard/stuff/event/adminClose/' + task_id)
						.then(function (res) {
							blockUI.stop();
							alertService.add(0, res.state.message);
							vm.onOpenStaff(stuff_id);
						});
				});
		};

		vm.onEditAdminTask = function (index) {
			$state.go('main.private.dashboard.abstract.tasks.edit', {id: index});
		};

		/*****************************/

		vm.convertDateTime = function (d) {
			var y = new Date(d);
			return y.toLocaleString().replace(',', ' / ');
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().slice(0, 10);
		};

	});