'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('stuffEditCtrl', function(http, blockUI, alertService, $state, $stateParams,$translate){
		var vm = this;
		console.log($stateParams.id);

		if (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go('main.private.dashboard.abstract.stafs');
			return;
		}
	    vm.stuff = {firstName: null, lastName: null, birth: null, email: null, password: null, typeExp: null};

		if ($stateParams.id !=='add') {
			http.get('private/dashboard/stuff/' + $stateParams.id)
				.then(function (res) {
					vm.Refresh();
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		}

		vm.StuffFields = [
			{
				className: 'col-md-12',
				key: 'vm.stuff.firstName',
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
				key: 'vm.stuff.lastName',
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
				key: 'vm.stuff.birth',
				type: 'datepicker',
				templateOptions: {
					type: 'text',
					label: $translate.instant('BIRTH_DATE'),
					datepickerPopup: 'yyyy-MMMM-dd'
				}
			},
			{
				className: 'col-md-12',
				key: 'vm.stuff.email',
				type: 'input',
				validators: {
					EmailAddress: {
						expression: function ($viewValue, $modelValue) {
							var value = $modelValue || $viewValue;
							return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
						},
						message: '$translate.instant("NO_VALID_EMAIL")'
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
				key: 'vm.stuff.password',
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
				key: 'vm.stuff.typeExp',
				type: 'select',
				templateOptions: {
					required: false,
					label: $translate.instant('TYPE_EXPORT'),
					placeholder: $translate.instant('TYPE_EXPORT'),
					options: [
						{name: $translate.instant('PDF'), value: 'PDF'},
						{name: $translate.instant('HTML'), value: 'HTML'}
					]
				},
				validation: {
					show: true
				}
			}
		];

		//vm.stuff = {};
	});