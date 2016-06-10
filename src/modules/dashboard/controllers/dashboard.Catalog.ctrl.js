'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('CatalogCtrl', function (http, blockUI, alertService, $state, $uibModal,localStorageService,$stateParams) {
		var vm = this;
		vm.FormTemplate = [];
		vm.myForms = [];
		vm.user = localStorageService.get('userData');
		vm.isPatient = ((vm.user.type).toUpperCase() === 'PATIENT');

		vm.filter_= {};
		vm.onAll = function() {
			//console.dir(vm.filter_.xALL);
			vm.filter_.xALL = true;
			vm.filter_.xPAT = false;
			vm.filter_.xMED = false;
			vm.filter_.xBOUGHT = false;
			vm.filter_.xFREE = false;
			vm.filter_.xGIFT = false;
			vm.filter_.searchStr = '';
		};
		vm.onAll();

		vm.onNoAll = function() {
			vm.filter_.xALL = false;
		};

		vm.onPat = function() {
			vm.filter_.xMED = (vm.filter_.xPAT) ? false : vm.filter_.xMED;
			vm.onNoAll();
		};

		vm.onMed = function() {
			vm.filter_.xPAT = (vm.filter_.xMED) ? false : vm.filter_.xPAT;
			vm.onNoAll();
		};

		vm.onBought = function() {
			if  (vm.filter_.xBOUGHT) {
				vm.filter_.xFREE = false;
				vm.filter_.xGIFT = false;
			}
			vm.onNoAll();
		};

		vm.onFree = function() {
			if  (vm.filter_.xFREE) {
				vm.filter_.xBOUGHT = false;
				vm.filter_.xGIFT = false;
			}
			vm.onNoAll();
		};

		vm.onGift = function() {
			if  (vm.filter_.xGIFT) {
				vm.filter_.xBOUGHT = false;
				vm.filter_.xFREE = false;
			}
			vm.onNoAll();
		};

		vm.filterByCategoryMy = function (item) {
			//console.log(item);
			if  (!vm.filter_.xALL) {
				if (   !(
						(vm.filter_.xPAT && item.templateDto.typeEnum === 'PATIENT') ||
						(vm.filter_.xMED && item.templateDto.typeEnum === 'MEDICAL') ||
						(!vm.filter_.xPAT && !vm.filter_.xMED)
					) ||
					!(
						(vm.filter_.xBOUGHT && item.templateDto.commercialEnum === 'PAID') ||
						(vm.filter_.xFREE && item.templateDto.commercialEnum === 'FREE') ||
						(vm.filter_.xGIFT && item.templateDto.commercialEnum === 'GIFT') ||
						(!vm.filter_.xBOUGHT && !vm.filter_.xFREE && !vm.filter_.xGIFT)
					)
				) {
					return;
				}
			}
			if  (vm.filter_.searchStr !== '') {
				if  (item.templateDto.name.toUpperCase().indexOf(vm.filter_.searchStr.toUpperCase()) === -1) {
					return;
				}
			}
			return item;
		};

		vm.filterByCategory = function (item) {
			//console.log(item);
			if  (!vm.filter_.xALL) {
				if (   !(
						(vm.filter_.xPAT && item.typeEnum === 'PATIENT') ||
						(vm.filter_.xMED && item.typeEnum === 'MEDICAL') ||
						(!vm.filter_.xPAT && !vm.filter_.xMED)
					) ||
					   !(
						(vm.filter_.xBOUGHT && item.commercialEnum === 'PAID') ||
						(vm.filter_.xFREE && item.commercialEnum === 'FREE') ||
						(vm.filter_.xGIFT && item.commercialEnum === 'GIFT') ||
						(!vm.filter_.xBOUGHT && !vm.filter_.xFREE && !vm.filter_.xGIFT)
					)
					) {
					return;
				}
			}
			if  (vm.filter_.searchStr !== '') {
				if  (item.name.toUpperCase().indexOf(vm.filter_.searchStr.toUpperCase()) === -1) {
					return;
				}
			}
			return item;
		};

		//if (!$stateParams.arr || $stateParams.arr === null || !angular.isArray($stateParams.arr)) {
		//	$state.go('main.private.dashboard.abstract.catalog');
		//	return;
		//}

		vm.arr = [];

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
			window.location.reload();
		};

		vm.onLoad = function (id) {
			http.get('private/dashboard/template/load/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
			window.location.reload();
		};

		vm.onView = function (id) {
			http.get('private/dashboard/template/preview/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.onRemove = function(id) {
			http.get('private/dashboard/template/delete/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
			window.location.reload();
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
			vm.save()
				.then(function(res) {
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
				});
		};

		vm.create_ = function () {
			var deferred = $q.defer();
			var paramsPOST = {template: {id: vm.model.data.userTempl_id, type: '', description: '', templateDto: null}, patient: vm.patient2.id};
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

		vm.edit = function(res) {
			var deferred = $q.defer();
			var paramsPOST = {event: {
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
					if  (res.result) {
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
			if  (!vm.model.data.task_id) {
				vm.create_()
					.then(function(res) {
						vm.model.data.task_id = res.result.id;
					}, function (error) {
						deferred.reject(error);
					})
					.then(function(res) {
						vm.edit();
						deferred.resolve(res);
					}, function (error) {
						deferred.reject(error);
					});
			} else {
				vm.edit()
					.then(function(res){
						deferred.resolve(res);
					}, function (error) {
						deferred.reject(error);
					});
			}
			$uibModalInstance.close();
			return deferred.promise;
		};


	});