'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('MyFormCtrl', function (http, blockUI, alertService) {
		var vm = this;
		vm.myForms = [];

		vm.onRefresh = function () {
			http.get('private/dashboard/user/template')
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
						vm.myForms = res.result;
					}
				});
		};
		vm.onRefresh();

		vm.onRemove = function(id) {
			console.log('id='+id);
			http.get('private/dashboard/template/delete/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
					vm.onRefresh();
				});
		};

	});