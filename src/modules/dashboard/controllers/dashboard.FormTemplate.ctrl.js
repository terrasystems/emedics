'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

.controller('FormTemplateCtrl', function (http, blockUI, alertService) {
	var vm = this;
	vm.FormTemplate = [];

	vm.onRefresh = function () {
		http.get('private/dashboard/template')
			.then(function (res) {
				blockUI.stop();
				if (res.state) {
					alertService.add(0, res.state.message);
					vm.FormTemplate = res.result;
				}
			});
	};
	vm.onRefresh();

	vm.onBuy = function (id) {
		console.log('id='+id);
		http.get('private/dashboard/template/pay/'+id)
			.then(function (res) {
				blockUI.stop();
				alertService.add(0, res.state.message);
				vm.onRefresh();
			});
	};

	vm.onLoad = function (id) {
		console.log('id='+id);
		http.get('private/dashboard/template/load/'+id)
			.then(function (res) {
				blockUI.stop();
				alertService.add(0, res.state.message);
				vm.onRefresh();
			});
	};

	vm.onView = function (id) {
		console.log('id='+id);
		http.get('private/dashboard/template/preview/'+id)
			.then(function (res) {
				blockUI.stop();
				alertService.add(0, res.state.message);
				vm.onRefresh();
			});
	};

	});