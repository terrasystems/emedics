'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

.controller('CatalogTemplateCtrl', function (http, blockUI, alertService,$stateParams, $state, localStorageService) {
	var vm = this;
	vm.FormTemplate = [];
	vm.user = localStorageService.get('userData');
	vm.isPatient = ((vm.user.type).toUpperCase() === 'PATIENT');

	if (!$stateParams.arr || $stateParams.arr === null || !angular.isArray($stateParams.arr)) {
		$state.go('main.private.dashboard.abstract.catalog');
		return;
	}

	vm.convertFormTemplate = function(arr) {
		arr.map(function(item){
			item.isPay = false;
			item.isLoad = false;
			item.isPreview = false;
			return item;
		});
		$stateParams.arr.forEach(function(e) {
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

	});