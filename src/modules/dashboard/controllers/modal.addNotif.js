'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

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
			return http.post('private/dashboard/' + vm.user.type + '/references/refs', {search: val, type: type})
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result) && res.result.length > 0) {
						res.result.map(function (item) {
							item.all = item.name + ', ' + item.email + ( (item.type == null) ? '' : ', ' + item.type);
							return item;
						});
					}
					return res.result;
				});
		};

		vm.getFind2 = function (val, type) {
			return http.post('private/dashboard/' + vm.user.type + '/references/refs', {search: val, type: type})
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result) && res.result.length > 0) {
						res.result.map(function (item) {
							item.all = item.name + ', ' + item.email + ( (item.type == null) ? '' : ', ' + item.type);
							return item;
						});
					}
					return res.result;
				});
		};

		vm.send = function () {
			vm.save()
				.then(function (res) {
					vm.message.toUser = vm.toUser.id;
					vm.message.patient = vm.patient2.id;
					vm.message.event = vm.model.data.task_id;
					http.post('private/dashboard/tasks/send', vm.message)
						.then(function (res) {
							blockUI.stop();
							if (res.state) {
								alertService.add(0, res.state.message);
							}
							$uibModalInstance.close(res);
						});
				});
		};

		vm.create_ = function () {
			var deferred = $q.defer();
			var paramsPOST = {
				template: {id: vm.model.data.templ_id, type: '', description: '', templateDto: null},
				patient: vm.patient2.id
			};
			http.post('private/dashboard/tasks/create', paramsPOST)
				.then(function (res) {
					if (!res.state.value) {
						deferred.reject(res);
					} else {
						deferred.resolve(res);
					}
				}, function (error) {
					deferred.reject(error);
				});
			return deferred.promise;
		};

		vm.edit = function (res) {
			var deferred = $q.defer();
			var paramsPOST = {
				event: {
					id: vm.model.data.task_id,
					date: null,
					status: '',
					patient: {id: vm.patient2.id},
					template: null,
					data: {},
					fromUser: {id: null},
					toUser: {id: vm.toUser.id},
					descr: ''
				}
			};
			http.post('private/dashboard/tasks/edit', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						alertService.add(0, res.state.message);
					}
					if (!res.state.value) {
						deferred.reject(res);
					} else {
						deferred.resolve(res);
					}
				}, function (error) {
					deferred.reject(error);
				});
			return deferred.promise;
		};

		vm.save = function () {
			var deferred = $q.defer();
			if (!vm.model.data.task_id) {
				vm.create_()
					.then(function (res) {
						vm.model.data.task_id = res.result.id;
					}, function (error) {
						deferred.reject(error);
					})
					.then(function (res) {
						vm.edit();
						deferred.resolve(res);
					}, function (error) {
						deferred.reject(error);
					});
			} else {
				vm.edit()
					.then(function (res) {
						deferred.resolve(res);
					}, function (error) {
						deferred.reject(error);
					});
			}
			return deferred.promise;
		};


	});