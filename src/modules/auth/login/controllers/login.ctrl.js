(function(){
	"use strict";
	/*jshint -W117, -W097, -W089, -W061*/
	angular.module('modules.auth')
		.controller('loginCtrl', function ($translate, alertService, $timeout, blockUI, DTO, auth, http, $state) {
			var vm = this;

			vm.user = DTO.loginDTO();

			vm.userFields = [
				{
					className: 'col-md-12',
					key: 'email',
					type: 'input',
					templateOptions: {
						type: 'email',
						required: true,
						label: $translate.instant('EMAIL'),
						placeholder: $translate.instant('EMAIL_1'),
						addonRight: {
							class: 'glyphicon glyphicon-user'
						}
					}
				},
				{
					className: 'col-md-12',
					key: 'password',
					type: 'input',
					templateOptions: {
						type: 'password',
						required: true,
						label: $translate.instant('PASSWORD'),
						placeholder: $translate.instant('PASSWORD_1'),
						addonRight: {
							class: 'glyphicon glyphicon-lock'
						}
					}
				}
			];
			vm.submit = function () {
				if (vm.form.$valid) {

					http.post('/auth/login', vm.user).then(function (res) {
						blockUI.stop();
						auth.saveUserData(res.result);
						if (res.msg) {
							alertService.success(res.msg);
						}
						$timeout(function () {
							$state.go('main.private.dashboard.tasks');
						}, 0);
					});
				}
			};

		});
})();
