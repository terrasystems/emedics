'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')

	.controller('patientReferencesAddCtrl', function ($translate,$state, localStorageService, initParamsPOST, http, blockUI, $timeout, alertService) {
		//console.log('..patientReferencesAddCtrl');
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.paramsPOST = initParamsPOST.params;
		vm.msg ='incorrect email';
		vm.model = {};
		vm.fields = [
			//{
			//	className: 'col-md-12',
			//	key: 'name',
			//	type: 'input',
			//	templateOptions: {
			//		label: 'Name',
			//		required: false,
			//		placeholder: 'Enter Name'
			//	}
			//},

			{
				className: 'col-md-12',
				key: 'email',
				type: 'input',
				validators: {
					EmailAddress: {
						expression: function ($viewValue, $modelValue) {
							var value = $modelValue || $viewValue;
							return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
						}

				}
				},
				templateOptions: {
					type: 'text',
					required: true,
					label: $translate.instant('EMAIL'),
					placeholder: $translate.instant('EMAIL_1')
				},
				validation: {
					messages: {
						required: function ($viewValue, $modelValue, scope) {
							return scope.to.label + ' is required';
						}
					}
				}

			}
		];


		vm.onSubmit = function () {
			http.post('private/dashboard/' + vm.user.type + '/references/create', vm.model.email)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
					$timeout(function () {
						$state.go('main.private.dashboard.abstract.ref');
					}, 500);
				});
		};

	});