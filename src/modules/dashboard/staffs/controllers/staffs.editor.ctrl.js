'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('stuffEditCtrl', function(http, blockUI, alertService, $state, $stateParams,$translate){
		var vm = this;
		console.log($stateParams.id);

		if (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go('main.private.dashboard.abstract.staffs');
			return;
		}
	    vm.stuff = DTO.staffInfo /*{firstName: null, lastName: '', birth: null, email: '', password: '', typeExp: '', phone: ''}*/;

		if ($stateParams.id !=='add') {
			http.get('private/dashboard/stuff/' + $stateParams.id)
				.then(function (res) {
					blockUI.stop();
					vm.stuff = res.result;
				});
		}

		vm.StuffFields = [
			{
				className: 'col-md-12',
				key: 'firstName',
				type: 'input',
				templateOptions: {
					required: false,
					label: $translate.instant('FIRST_NAME'),
					placeholder: $translate.instant('FIRST_NAME')
				},
				validation: {
					show: true
				}
			},
			{
				className: 'col-md-12',
				key: 'lastName',
				type: 'input',
				templateOptions: {
					required: false,
					label: $translate.instant('LAST_NAME'),
					placeholder: $translate.instant('LAST_NAME')
				},
				validation: {
					show: true
				}
			},
			{
				className: 'col-md-12',
				key: 'birth',
				type: 'datepicker',
				templateOptions: {
					type: 'text',
					required: false,
					label: $translate.instant('BIRTH_DATE'),
					datepickerPopup: 'yyyy-MMMM-dd'
				},
				validation: {
					show: true
				}
			},
			{
				className: 'col-md-12',
				key: 'email',
				type: 'input',
				validators: {
					EmailAddress: {
						expression: function ($viewValue, $modelValue) {
							var value = $modelValue || $viewValue;
							return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
						},
						message: '$viewValue + $translate.instant("NO_VALID_EMAIL")'
					}
				},
				templateOptions: {
					type: 'text',
					required: true,
					label: $translate.instant('EMAIL'),
					placeholder: $translate.instant('EMAIL_1')
				},
				validation: {
					show: true,
					messages: {
						required: function ($viewValue, $modelValue, scope) {
							return scope.to.label + ' is required';
						}
					}
				}
			},
			{
				className: 'col-md-12',
				key: 'password',
				type: 'input',
				templateOptions: {
					type:'password',
					required: false,
					label: $translate.instant('PASSWORD')
				},
				validation: {
					show: true
				}
			},
			{
				className: 'col-md-12',
				key: 'typeExp',
				type: 'select',
				templateOptions: {
					required: false,
					label: $translate.instant('TYPE_EXPORT'),
					placeholder: $translate.instant('TYPE_EXPORT'),
					options: [
						{name: $translate.instant('PDF'), value: '0'},
						{name: $translate.instant('HTML'), value: '1'}
					]
				},
				validation: {
					show: true
				}
			},
			{
				className: 'col-md-12',
				key: 'phone',
				type: 'input',
				templateOptions: {
					required: true,
					label: $translate.instant('PHONE'),
					placeholder: $translate.instant('PHONE')
				},
				validation: {
					show: true
				}
			}
		];

		vm.onSave = function() {
			if ($stateParams.id == 'add') {
				vm.stuff.id = null;
				http.post('private/dashboard/stuff/create', vm.stuff)
					.then(function (res) {
						blockUI.stop();
						if (res.state) {
							alertService.add(0, res.state.message);
							$state.go('main.private.dashboard.abstract.staffs');
						}
					});
			} else {
				http.post('private/dashboard/stuff/edit', vm.stuff)
					.then(function (res) {
						blockUI.stop();
						if (res.state) {
							alertService.add(0, res.state.message);
							$state.go('main.private.dashboard.abstract.staffs');
						}
					});
			}
		};

	});