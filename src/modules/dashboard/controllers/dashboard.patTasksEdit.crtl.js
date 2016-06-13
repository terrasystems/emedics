'use strict';
/*jshint -W117, -W097, -W116, -W089, -W061*/

angular.module('modules.dash')

	.controller('patientTasksEditCtrl', function ($uibModal, http, $q, $stateParams, $state, localStorageService, blockUI, $scope, alertService, $timeout, $translate, $base64) {
		//console.log('Type: ' + $stateParams.type + ' id: ' + $stateParams.id + ' patId: ' + $stateParams.patId);
		if (!$stateParams.type || $stateParams.type === '' || $stateParams.type === null) {
			$state.go('main.private.dashboard.abstract.tasks');
			return;
		}

		var vm = this;

		if ($stateParams.type == 'tasks') {
			vm.mainState = 'main.private.dashboard.abstract.tasks';
		} else {
			vm.mainState = 'main.private.dashboard.abstract.patients';
		}

	    vm.hideButton = $stateParams.type;
		if (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go(vm.mainState);
			return;
		} else {
			vm.id = $stateParams.id;
		}

		vm.user = localStorageService.get('userData');
		if ($stateParams.type == 'tasks') {
			vm.getUrl = 'private/dashboard/tasks/' + vm.id;
			vm.setUrl = 'private/dashboard/tasks/edit';
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

		vm.onSubmit = onSubmit;


		vm.getModelEdit = function (id) {
			http.get('private/dashboard/tasks/' + id)
				.then(function (res) {
					blockUI.stop();

					//if ($stateParams.type == 'tasks') {
						vm.checkArr = (res.result && res.result.template && res.result.template.body && res.result.template.body.sections && res.result.id);
					//} else {
					//	vm.checkArr = (res.result && res.result.form && res.result.form.template && res.result.form.template.body && res.result.form.template.body.sections && res.result.form.id);
					//}

					if (vm.checkArr) {
						vm.model = (res.result.data && res.result.data.sections) ? res.result.data.sections : undefined;
						vm.formInfo = {};

						vm.formInfo.id = res.result.id;
						vm.formInfo.category = res.result.template.category;
						vm.formInfo.name = res.result.template.name;
						vm.formInfo.number = res.result.template.number;
						vm.formInfo.descr = res.result.template.descr;
						//vm.formInfo.id = ($stateParams.type == 'tasks') ?  res.result.id : res.result.form.id;
						//vm.formInfo.category = ($stateParams.type == 'tasks') ? res.result.template.category : res.result.form.template.category;
						//vm.formInfo.name =($stateParams.type == 'tasks') ? res.result.template.name : res.result.form.template.name;
						//vm.formInfo.number = ($stateParams.type == 'tasks') ? res.result.template.number : res.result.form.template.number;
						//vm.formInfo.descr = ($stateParams.type == 'tasks') ? res.result.template.descr : res.result.form.template.descr;

						vm.sectionsName = [];
						vm.sections = [];
						//if ($stateParams.type == 'tasks') {
							vm.sections = eval($base64.decode(res.result.template.body.sections));
							vm.sections.forEach(function (item) {
								vm.sectionsName.push(Object.keys(item)[0]);
							});
						//} else {
						//	vm.sections = eval($base64.decode(res.result.form.template.body.sections));
						//	vm.sections.forEach(function (item) {
						//		vm.sectionsName.push(Object.keys(item)[0]);
						//	});
						//}

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


		if ($stateParams.type == 'patients') {
			console.log('...create!');
			var paramsPOST = {
				template: {
					id: vm.id,
					type: null,
					description: null,
					templateDto: null
				},
				patient: $stateParams.patId
			};
			http.post('private/dashboard/tasks/create', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
						vm.id = res.result.id;
					}
				}
			).then( function(res) {
					vm.getModelEdit(vm.id);
				});
		} else {
			vm.getModelEdit(vm.id);
		}

		vm.s = function () {
			save().then(function () {
						$state.go('main.private.dashboard.abstract.notifications.addnotification', {
							id: vm.formInfo.id,
							name: vm.formInfo.name
						});
				}
			);
		};

		function save() {
			var deferred = $q.defer();
			var paramsPOST = {event: {id: vm.id, data: {sections: vm.model}}};

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

		function onSubmit() {
			save().then(function () {
				$timeout(function () {
					$state.go(vm.mainState);
				}, 0);
			});
		}

		vm.onAddTask = function() {
			var model = {task_id: vm.id, obj: vm.formInfo};
			blockUI.start();
			var result = $uibModal.open({
				templateUrl: 'modules/dashboard/views/modal.addNotif.html',
				controller: 'modalAddNotifCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function($q) {
						var deferred = $q.defer();
						deferred.resolve({data: model});
						return deferred.promise;
					}
				}
			}).result;
			$state.go('main.private.dashboard.abstract.tasks');
		};

	});