(function(){
	"use strict";
	/*jshint -W117, -W097, -W089, -W061*/
	angular.module('modules.public')
		.controller('loginCtrl', function ($translate) {
			var vm = this;

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
		});
})();
