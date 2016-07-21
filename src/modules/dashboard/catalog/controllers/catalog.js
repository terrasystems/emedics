'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('CatalogCtrl', function (http, blockUI, alertService, $state, $uibModal, localStorageService, $stateParams, $scope, $q, DTO) {
		var vm = this;
		vm.userType = localStorageService.get('userData');
		vm.FormTemplate = [];
		vm.myForms = [];
		vm.user = localStorageService.get('userData');
		//vm.isPatient = ((vm.user.type).toUpperCase() === 'PATIENT');

		//vm.filter_ = {};
		//function onAll() {
		//	vm.filter_.xALL = true;
		//	vm.filter_.xPAT = false;
		//	vm.filter_.xMED = false;
		//	vm.filter_.xBOUGHT = false;
		//	vm.filter_.xFREE = false;
		//	vm.filter_.xGIFT = false;
		//	vm.filter_.searchStr = '';
		//}
		//
		//onAll();
		//
		//vm.onNoAll = function () {
		//	vm.filter_.xALL = false;
		//};
		//
		//vm.onPat = function () {
		//	vm.filter_.xMED = (vm.filter_.xPAT) ? false : vm.filter_.xMED;
		//	vm.onNoAll();
		//};
		//
		//vm.onMed = function () {
		//	vm.filter_.xPAT = (vm.filter_.xMED) ? false : vm.filter_.xPAT;
		//	vm.onNoAll();
		//};
		//
		//vm.onBought = function () {
		//	if (vm.filter_.xBOUGHT) {
		//		vm.filter_.xFREE = false;
		//		vm.filter_.xGIFT = false;
		//	}
		//	vm.onNoAll();
		//};
		//
		//vm.onFree = function () {
		//	if (vm.filter_.xFREE) {
		//		vm.filter_.xBOUGHT = false;
		//		vm.filter_.xGIFT = false;
		//	}
		//	vm.onNoAll();
		//};
		//
		//vm.onGift = function () {
		//	if (vm.filter_.xGIFT) {
		//		vm.filter_.xBOUGHT = false;
		//		vm.filter_.xFREE = false;
		//	}
		//	vm.onNoAll();
		//};
		//
		//vm.filterByCategoryMy = function (item) {
		//	if (!vm.filter_.xALL) {
		//		if (!(
		//				(vm.filter_.xPAT && item.templateDto.typeEnum === 'PATIENT') ||
		//				(vm.filter_.xMED && item.templateDto.typeEnum === 'MEDICAL') ||
		//				(!vm.filter_.xPAT && !vm.filter_.xMED)
		//			) || !(
		//				(vm.filter_.xBOUGHT && item.templateDto.commercialEnum === 'PAID') ||
		//				(vm.filter_.xFREE && item.templateDto.commercialEnum === 'FREE') ||
		//				(vm.filter_.xGIFT && item.templateDto.commercialEnum === 'GIFT') ||
		//				(!vm.filter_.xBOUGHT && !vm.filter_.xFREE && !vm.filter_.xGIFT)
		//			)
		//		) {
		//			return;
		//		}
		//	}
		//	if (vm.filter_.searchStr !== '') {
		//		if (item.templateDto.name.toUpperCase().indexOf(vm.filter_.searchStr.toUpperCase()) === -1) {
		//			return;
		//		}
		//	}
		//	return item;
		//};
		//
		//vm.filterByCategory = function (item) {
		//	if (!vm.filter_.xALL) {
		//		if (!(
		//				(vm.filter_.xPAT && item.typeEnum === 'PATIENT') ||
		//				(vm.filter_.xMED && item.typeEnum === 'MEDICAL') ||
		//				(!vm.filter_.xPAT && !vm.filter_.xMED)
		//			) || !(
		//				(vm.filter_.xBOUGHT && item.commercialEnum === 'PAID') ||
		//				(vm.filter_.xFREE && item.commercialEnum === 'FREE') ||
		//				(vm.filter_.xGIFT && item.commercialEnum === 'GIFT') ||
		//				(!vm.filter_.xBOUGHT && !vm.filter_.xFREE && !vm.filter_.xGIFT)
		//			)
		//		) {
		//			return;
		//		}
		//	}
		//	if (vm.filter_.searchStr !== '') {
		//		if (item.name.toUpperCase().indexOf(vm.filter_.searchStr.toUpperCase()) === -1) {
		//			return;
		//		}
		//	}
		//	return item;
		//};

		vm.arr = [];

		vm.getAllTemplates = function () {
			return http.post('/catalog/all', DTO.criteriaDTO())
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						vm.FormTemplate = res.result;
					}
					return res.result;
				});
		};

		vm.getAllTemplates();


		vm.getMyTemplates = function () {
			return http.post('/catalog/all', DTO.criteriaDTO())
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						vm.myForms = res.result;
					}
					return res.result;
				});
		};

		vm.getMyTemplates();

		//vm.myForms.forEach(function (e) {
		//	var item = {};
		//	item.id = e.templateDto.id;
		//	item.type = e.type;
		//	vm.arr.push(item);
		//});
		//
		//vm.convertFormTemplate = function (arr) {
		//	arr.map(function (item) {
		//		item.isPay = false;
		//		item.isLoad = false;
		//		item.isPreview = false;
		//		return item;
		//	});
		//	vm.arr.forEach(function (e) {
		//		arr.map(function (item) {
		//			if (item.id == e.id) {
		//				if (e.type == 'PAID') {
		//					item.isPay = true;
		//					item.isLoad = true;
		//				}
		//				else {
		//					item.isPay = false;
		//					item.isLoad = true;
		//				}
		//			}
		//			return item;
		//		});
		//	});
		//	return arr;
		//};


		vm.Buy = function () {
			console.log('PAID');
		};

		vm.Load = function (id) {
			http.get('/mytemplates/add' + id)
				.then(function (res) {

					return res.result;
					//var paramsPOST = DTO.createTask;
					//paramsPOST.template.id = rest.result;
					//paramsPOST.template.type = vm.templateParams.typeEnum;
					//vm.Send(paramsPOST);
				}
			);
		};

		vm.View = function (id) {
			http.get('/catalog/view' + id)
				.then(function (res) {
					blockUI.stop();
					return res.result;
				});
		};

		vm.remove = function (id) {
			http.get('/mytemplates/remove' + id)
				.then(function (res) {
					vm.getMyTemplates();
					blockUI.stop();

					return res.result;
				});
		};

		vm.AddTask = function (obj) {

		};

		//vm.Send = function(cfg) {
		//	if (vm.user.type === 'patient' || cfg.template.type === 'MEDICAL') {
		//		http.post('private/dashboard/tasks/create', cfg)
		//			.then(function (res) {
		//				blockUI.stop();
		//				alertService.add(0, res.state.message);
		//			});
		//	} else {
		//		var config = {
		//			templateUrl: 'modules/dashboard/views/modal.sendTaskMulti.html',
		//			controller: 'modalSendTaskMultiCtrl',
		//			controllerAs: 'vm',
		//			resolve: {
		//				model: function($q) {
		//					var deferred = $q.defer();
		//					deferred.resolve({data: {template_id: cfg.template.id}});
		//					return deferred.promise;
		//				}
		//			}
		//		};
		//		var result = $uibModal.open(config);
		//		result.result.then(function () {
		//			$state.go('main.private.dashboard.abstract.catalog');
		//		});
		//	}
		//};

	});
