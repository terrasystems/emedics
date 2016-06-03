'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

.controller('FormTemplateCtrl', function (http, blockUI, alertService, $stateParams, $state) {
	var vm = this;
	vm.FormTemplate = [];

	if (!$stateParams.arr || $stateParams.arr === null || !angular.isArray($stateParams.arr)) {
		$state.go('main.private.dashboard.abstract.myforms');
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
			console.dir(e);
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
				//vm.onRefresh();
			});
	};

	vm.onLoad = function (id) {
		http.get('private/dashboard/template/load/'+id)
			.then(function (res) {
				blockUI.stop();
				alertService.add(0, res.state.message);
				//vm.onRefresh();
			});
	};

	vm.onView = function (id) {
		http.get('private/dashboard/template/preview/'+id)
			.then(function (res) {
				blockUI.stop();
				alertService.add(0, res.state.message);
				//vm.onRefresh();
			});
	};

	});