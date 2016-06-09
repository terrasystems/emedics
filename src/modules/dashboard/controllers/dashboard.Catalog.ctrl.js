'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('CatalogCtrl', function (http, blockUI, alertService, $state, $uibModal,localStorageService,$stateParams) {
		var vm = this;
		vm.FormTemplate = [];
		vm.user = localStorageService.get('userData');
		vm.isPatient = ((vm.user.type).toUpperCase() === 'PATIENT');

		//if (!$stateParams.arr || $stateParams.arr === null || !angular.isArray($stateParams.arr)) {
		//	$state.go('main.private.dashboard.abstract.catalog');
		//	return;
		//}

		vm.arr = [];

		vm.myForms = [];

		vm.Refresh = function () {
			http.get('private/dashboard/user/template')
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						vm.myForms = res.result;
					}
				});
		};
		vm.Refresh();


		vm.myForms.forEach(function(e) {
			var item = {};
			item.id = e.templateDto.id;
			item.type = e.type;
			vm.arr.push(item);
		});


		vm.convertFormTemplate = function(arr) {
			arr.map(function(item){
				item.isPay = false;
				item.isLoad = false;
				item.isPreview = false;
				return item;
			});
			vm.arr.forEach(function(e) {
				arr.map(function(item){
					if  (item.id == e.id) {
						if (e.type == 'PAID') {
							item.isPay = true;
							item.isLoad = true;
						}
						else {
							item.isPay = false;
							item.isLoad = true;
						}
					}
					return item;
				});
			});
			return arr;
		};

		vm.onRefresh = function () {
			http.get('private/dashboard/template')
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						vm.FormTemplate = vm.convertFormTemplate(res.result);
					}
				});
		};
		vm.onRefresh();

		vm.onBuy = function (id) {
			http.get('private/dashboard/template/pay/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.onLoad = function (id) {
			http.get('private/dashboard/template/load/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.onView = function (id) {
			http.get('private/dashboard/template/preview/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};






		vm.onRefresh();

		vm.onRemove = function(id) {
			http.get('private/dashboard/template/delete/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
					vm.onRefresh();
				});
		};


		vm.onAddTask = function(obj) {
			var model = { userTempl_id: obj.id, obj: obj};
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
		};

	})


	.controller('modalAddNotifCtrl', function ($uibModalInstance, model, blockUI, alertService, $timeout, http, localStorageService, $scope, $q) {
		var vm = this;
		vm.model = model;
		vm.user = localStorageService.get('userData');
		blockUI.stop();

		if (vm.user.type === 'patient') {
			vm.patient2 = {};
			vm.patient2.id = vm.user.id;
		} else {
			vm.patient2 = '';
		}
		vm.toUser = '';
		vm.message = {toUser: null, event: vm.model.data.task_id, message: '', patient: null};

		vm.getFind = function (val, type) {
			return http.post('private/dashboard/' + vm.user.type + '/references/refs', {search: val, type: type} )
				.then(function (res) {
					blockUI.stop();
					if  (angular.isArray(res.result) && res.result.length>0) {
						res.result.map(function (item) {
							item.all = item.name + ', ' + item.email + ( (item.type == null) ? '' : ', ' + item.type);
							return item;
						});
					}
					return res.result;
				});
		};

		vm.getFind2 = function (val, type) {
			return http.post('private/dashboard/' + vm.user.type + '/references/refs', {search: val, type: type} )
				.then(function (res) {
					blockUI.stop();
					if  (angular.isArray(res.result) && res.result.length>0) {
						res.result.map(function (item) {
							item.all = item.name + ', ' + item.email + ( (item.type == null) ? '' : ', ' + item.type);
							return item;
						});
					}
					return res.result;
				});
		};

		vm.send = function () {
			vm.message.toUser = vm.toUser.id;
			vm.message.patient = vm.patient2.id;
			vm.message.event = vm.model.data.task_id;
			http.post('private/dashboard/tasks/send', vm.message)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
				});
			$uibModalInstance.dismiss('cancel');
		};

		//function create() {
		//	var deferred = $q.defer();
        //
		//	http.post(vm.setUrl, paramsPOST)
		//		.then(function (res) {
		//			blockUI.stop();
		//			if (res.state) {
		//				alertService.add(0, res.state.message);
		//			}
		//			deferred.resolve(res);
		//		}, function (error) {
		//			deferred.reject(error);
		//		});
		//	return deferred.promise;
		//}

		vm.save = function () {
			var paramsPOST = {template: {id: vm.model.data.userTempl_id, type: '', description: '', templateDto: null}, patient: $scope.patient.id};
			if  (!vm.model.data.task_id) {
				http.post('private/dashboard/tasks/create', paramsPOST)
					.then(function (res) {
						blockUI.stop();
						if  (res.result) {
							alertService.add(0, res.state.message);
							vm.model.data.task_id = res.result.id;
						}
					});
			}
			paramsPOST = {event: {
								id: vm.model.data.task_id,
								date: null,
								status: '',
								patient: {id: $scope.patient2.id},
								template: null,
								data: {},
								fromUser: {id: null},
								toUser: {id: $scope.toUser.id},
								descr: ''
								}
						};
			http.post('private/dashboard/tasks/edit', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if  (res.result) {
						alertService.add(0, res.state.message);
					}
				});
			$uibModalInstance.close();
		};


	});