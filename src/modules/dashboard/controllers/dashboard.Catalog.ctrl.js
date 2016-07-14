'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('CatalogCtrl', function (http, blockUI, alertService, $state, $uibModal, localStorageService, $stateParams, $scope, $q) {
		var vm = this;
		vm.userType = localStorageService.get('userData');
		vm.FormTemplate = [];
		vm.myForms = [];
		vm.user = localStorageService.get('userData');
		vm.isPatient = ((vm.user.type).toUpperCase() === 'PATIENT');

		vm.filter_ = {};
		function onAll() {
			vm.filter_.xALL = true;
			vm.filter_.xPAT = false;
			vm.filter_.xMED = false;
			vm.filter_.xBOUGHT = false;
			vm.filter_.xFREE = false;
			vm.filter_.xGIFT = false;
			vm.filter_.searchStr = '';
		}

		onAll();

		vm.onNoAll = function () {
			vm.filter_.xALL = false;
		};

		vm.onPat = function () {
			vm.filter_.xMED = (vm.filter_.xPAT) ? false : vm.filter_.xMED;
			vm.onNoAll();
		};

		vm.onMed = function () {
			vm.filter_.xPAT = (vm.filter_.xMED) ? false : vm.filter_.xPAT;
			vm.onNoAll();
		};

		vm.onBought = function () {
			if (vm.filter_.xBOUGHT) {
				vm.filter_.xFREE = false;
				vm.filter_.xGIFT = false;
			}
			vm.onNoAll();
		};

		vm.onFree = function () {
			if (vm.filter_.xFREE) {
				vm.filter_.xBOUGHT = false;
				vm.filter_.xGIFT = false;
			}
			vm.onNoAll();
		};

		vm.onGift = function () {
			if (vm.filter_.xGIFT) {
				vm.filter_.xBOUGHT = false;
				vm.filter_.xFREE = false;
			}
			vm.onNoAll();
		};

		vm.filterByCategoryMy = function (item) {
			if (!vm.filter_.xALL) {
				if (!(
						(vm.filter_.xPAT && item.templateDto.typeEnum === 'PATIENT') ||
						(vm.filter_.xMED && item.templateDto.typeEnum === 'MEDICAL') ||
						(!vm.filter_.xPAT && !vm.filter_.xMED)
					) || !(
						(vm.filter_.xBOUGHT && item.templateDto.commercialEnum === 'PAID') ||
						(vm.filter_.xFREE && item.templateDto.commercialEnum === 'FREE') ||
						(vm.filter_.xGIFT && item.templateDto.commercialEnum === 'GIFT') ||
						(!vm.filter_.xBOUGHT && !vm.filter_.xFREE && !vm.filter_.xGIFT)
					)
				) {
					return;
				}
			}
			if (vm.filter_.searchStr !== '') {
				if (item.templateDto.name.toUpperCase().indexOf(vm.filter_.searchStr.toUpperCase()) === -1) {
					return;
				}
			}
			return item;
		};

		vm.filterByCategory = function (item) {
			if (!vm.filter_.xALL) {
				if (!(
						(vm.filter_.xPAT && item.typeEnum === 'PATIENT') ||
						(vm.filter_.xMED && item.typeEnum === 'MEDICAL') ||
						(!vm.filter_.xPAT && !vm.filter_.xMED)
					) || !(
						(vm.filter_.xBOUGHT && item.commercialEnum === 'PAID') ||
						(vm.filter_.xFREE && item.commercialEnum === 'FREE') ||
						(vm.filter_.xGIFT && item.commercialEnum === 'GIFT') ||
						(!vm.filter_.xBOUGHT && !vm.filter_.xFREE && !vm.filter_.xGIFT)
					)
				) {
					return;
				}
			}
			if (vm.filter_.searchStr !== '') {
				if (item.name.toUpperCase().indexOf(vm.filter_.searchStr.toUpperCase()) === -1) {
					return;
				}
			}
			return item;
		};

		vm.arr = [];

		vm.Refresh = getUserTemplate;
		function getUserTemplate() {
			http.get('private/dashboard/user/template')
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						vm.myForms = res.result;
					}
				});
		}

		vm.Refresh();

		vm.myForms.forEach(function (e) {
			var item = {};
			item.id = e.templateDto.id;
			item.type = e.type;
			vm.arr.push(item);
		});

		vm.convertFormTemplate = function (arr) {
			arr.map(function (item) {
				item.isPay = false;
				item.isLoad = false;
				item.isPreview = false;
				return item;
			});
			vm.arr.forEach(function (e) {
				arr.map(function (item) {
					if (item.id == e.id) {
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

		vm.onRefresh = getAllTemplates;
		function getAllTemplates() {
			http.get('private/dashboard/template')
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						vm.FormTemplate = vm.convertFormTemplate(res.result);
					}
				});
		}

		vm.onRefresh();

		vm.onBuy = function (id) {
			http.get('private/dashboard/template/pay/' + id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.onLoad = function (id) {
			http.get('private/dashboard/template/load/' + id)
				.then(function (rest) {
					vm.templateParams = vm.FormTemplate.find(function (form) {
						return form.id === id;
					});
					var paramsPOST = {
						template: {
							id: rest.result,
							type: vm.templateParams.typeEnum,
							description: null,
							templateDto: null
						},
						patient: null,
						data: "{}"
					};
					vm.Send(paramsPOST);
				},
				function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				}
			);
		};

		vm.onView = function (id) {
			http.get('private/dashboard/template/preview/' + id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.onRemove = function (id) {
			http.get('private/dashboard/template/delete/' + id)
				.then(function (res) {
					vm.Refresh();
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.onAddTask = function (obj) {
			var paramsPOST = {
				template: {
					id: obj.templateDto.id,
					type: obj.templateDto.typeEnum,
					description: null,
					templateDto: null
				},
				patient: null,
				data: "{}"
			};
			vm.Send(paramsPOST);
		};

		vm.Send = function(cfg) {
			if (vm.user.type === 'patient' || cfg.template.type === 'MEDICAL') {
				http.post('private/dashboard/tasks/create', cfg)
					.then(function (res) {
						blockUI.stop();
						alertService.add(0, res.state.message);
					});
			} else {
				var config = {
					templateUrl: 'modules/dashboard/views/modal.sendTaskMulti.html',
					controller: 'modalSendTaskMultiCtrl',
					controllerAs: 'vm',
					resolve: {
						model: function($q) {
							var deferred = $q.defer();
							deferred.resolve({data: {template_id: cfg.template.id}});
							return deferred.promise;
						}
					}
				};
				var result = $uibModal.open(config);
				result.result.then(function () {
					$state.go('main.private.dashboard.abstract.catalog');
				});
			}
		};

	});
