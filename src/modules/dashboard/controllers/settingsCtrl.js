'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('settingsCtrl', function ($rootScope, http) {
		var vm = this;

		vm.paramsPOST = {
			id: null,
			password: '',
			username: angular.copy($rootScope.userData.name),
			email: angular.copy($rootScope.userData.email),
			typeExp: angular.copy($rootScope.userData.typeExp),
			type: null
		};

		vm.onSave = function () {
			console.log(vm.InfoChange);
			http.post('private/user_edit', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.list = res.result;
						vm.page = res.page;
					}
				});
		};

	});
