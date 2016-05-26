'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('settingsCtrl', function (alertService,blockUI,$rootScope, http) {
		var vm = this;

		vm.paramsPOST = {
			'id': null,
			'password': '',
			'username': angular.copy($rootScope.userData.name),
			'email': angular.copy($rootScope.userData.email),
			'typeExp': angular.copy($rootScope.userData.typeExp),
			'type': null
		};

		vm.onSave = function () {
			console.log(vm.paramsPOST);
			http.post('public/user_edit', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						alertService.add(0, res.state.message);
						vm.list = res.result;
						vm.page = res.page;
					}
				});
		};

	});
