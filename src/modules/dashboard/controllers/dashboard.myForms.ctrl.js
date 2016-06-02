'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('MyFormCtrl', function (http, blockUI, alertService) {
		var vm = this;

		vm.myForms = [];

		http.get('template_user')
			.then(function (res) {
				blockUI.stop();
				if (res.state) {
					alertService.add(0, res.state.message);
					vm.myForms = res.result;
				}
			});

	});