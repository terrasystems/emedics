'use strict';
/*jshint -W117, -W097, -W116, -W089, -W061*/
angular.module('modules.dash')
	.controller('patientTasksEditCtrl', function ($uibModal, http, $q, $stateParams, $state, localStorageService, blockUI,
												  $scope, alertService, $timeout, $translate, $base64, confirmService,$rootScope) {

		if (!$stateParams.type || $stateParams.type === '' || $stateParams.type === null) {
			$state.go('main.private.dashboard.abstract.tasks');
			return;
		}

		var vm = this;
		vm.editModel = {};
		vm.user = localStorageService.get('userData');
		var base = $rootScope.db;

		if ($stateParams.type == 'tasks' || $stateParams.type == 'tasks+') {
			vm.mainState = 'main.private.dashboard.abstract.tasks';
		} else if ($stateParams.type == 'patients' || $stateParams.type == 'patients+') {
			vm.mainState = 'main.private.dashboard.abstract.patients';
		} else if ($stateParams.type == 'tasksAdmin') {
			vm.mainState = 'main.private.dashboard.abstract.tasks';
		}

		if (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go(vm.mainState);
			return;
		} else {
			vm.id = $stateParams.id;
		}

		if ($stateParams.type == 'patients+' || $stateParams.type == 'tasks+') {
			vm.viewButtons = false;
			vm.viewButtonSave = false;
		} else if ($stateParams.type == 'tasksAdmin') {
			vm.viewButtons = false;
			vm.viewButtonSave = true;
		} else {
			vm.viewButtons = true;
			vm.viewButtonSave = true;
		}

		if ($stateParams.type == 'tasksAdmin') {
			vm.getUrl = 'private/dashboard/tasks/' + vm.id;
			vm.setUrl = 'private/dashboard/stuff/event/adminEdit';
		} else {
			vm.getUrl = 'private/dashboard/tasks/' + vm.id;
			vm.setUrl = 'private/dashboard/tasks/edit';
		}

		vm.sections = [];
		vm.options = [];
		vm.model = [];
		vm.sectionsName = [];
		vm.selectedSection = '';
		vm.selectedKey = '';

		vm.getModelEdit = function (id) {
			http.get(vm.getUrl)
				.then(function (res) {
					blockUI.stop();

					vm.editModel = res.result;
					vm.checkArr = (res.result && res.result.template && res.result.template.body && res.result.template.body.sections && res.result.id);

					if (vm.checkArr) {
						vm.model = (res.result.data && res.result.data.sections) ? res.result.data.sections : undefined;
						vm.formInfo = {};

						vm.formInfo.id = res.result.id;
						vm.formInfo.category = res.result.template.category;
						vm.formInfo.name = res.result.template.name;
						vm.formInfo.number = res.result.template.number;
						vm.formInfo.descr = res.result.template.descr;
						vm.sectionsName = [];
						vm.sections = [];

						vm.sections = eval($base64.decode(res.result.template.body.sections));
						vm.sections.forEach(function (item) {
							vm.sectionsName.push(Object.keys(item)[0]);
						});

						if (!vm.model) {
							vm.model = [];
							vm.sectionsName.forEach(function (item) {
								var it = {};
								it[item] = {};
								vm.model.push(it);
							});
						}
						vm.selectedSection = vm.sectionsName[0];
						if (vm.sectionsName.length > 0) {
							for (var key in  vm.model) {
								var obj = vm.model[key][Object.keys(vm.model[key])[0]];
								for (var prop in obj) {
									if (obj.hasOwnProperty(prop) && prop.indexOf('_DATE') > 0 && obj[prop] !== null) {
										obj[prop] = new Date(obj[prop]);
									}
								}
							}
						}

						$scope.$watch('vm.selectedSection', function (newValue) {
							for (var key in vm.model) {
								if (newValue == Object.keys(vm.model[key])[0]) {
									vm.selectedKey = key;
								}
							}
						});
					}
				});
		};

		vm.getModelEdit(vm.id);

		function save() {
			var deferred = $q.defer();
			var paramsPOST = {event: {id: vm.id, data: {sections: vm.model}}};
			paramsPOST.event.patient = vm.editModel.patient;
			paramsPOST.event.template = vm.editModel.template;
			paramsPOST.event.fromUser = vm.editModel.fromUser;
			paramsPOST.event.toUser = vm.editModel.toUser;

			http.post(vm.setUrl, paramsPOST)
				.then(function (res) {
					blockUI.stop();
					deferred.resolve(res);
					if (res.state) {
						alertService.add(0, res.state.message);
					}
				}, function (error) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		vm.onSave = function () {
			save().then(function () {
				$state.go(vm.mainState);
			});
		};


		vm.onSaveDraft = function() {
			var doc = {
				_id:new Date().toISOString(),
				status:'draft',
				draftName:vm.formInfo.name,
				body:{
					sections: vm.model
				}
			};

			base.put(doc, function(err) {
				if (err) { console.log(err);
				}else{
					console.log("ok");
				}
				base.allDocs({include_docs: true}).then(function(result){
					console.log(result.rows);
				});
			});

		};

		//db.allDocs({include_docs: true}).then(function(result){
		//	console.log(result.rows);
		//});

		//$scope.recordlist = dataService.get();
		//console.log($scope.recordlist);

		//vm.onSaveDraft = function () {
		//	var doc = {
		//		_id:new Date().toISOString(),
		//		_rev:'',
		//		status:"draft",
		//		body:{
		//			sections: vm.model
		//		}
		//	};
		//
     //db.post(doc)
		//		.then(get)
		//		.then(bind)
		//		.catch(error);
		//
		//
		//
		//	//$state.go(vm.mainState);
		//};

		vm.onSend = function() {
			var config = {
				templateUrl: 'modules/dashboard/views/modal.addNotif.html',
				controller: 'modalAddNotifCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function($q) {
						var deferred = $q.defer();
						deferred.resolve({data: {task_id: vm.id, obj: vm.formInfo}});
						return deferred.promise;
					}
				}
			};

			save().then(function () {
				var result = $uibModal.open(config);
				result.result.then(function () {
					$state.go(vm.mainState);
				});
			});

		};

		vm.onReturn = function () {
			confirmService('Save task?')
				.then(function(res) {
					save().then(function () {
						$state.go(vm.mainState);
					});
				}, function() {
					$state.go(vm.mainState);
				});


		};

		vm.onCloseTask = function() {
			confirmService('Close task?')
				.then(function(res) {
				http.get('private/dashboard/tasks/close/'+vm.id)
					.then(function (res) {
						blockUI.stop();
						alertService.add(0, res.state.message);
						vm.onReturn();
					});
				});
		};

	});