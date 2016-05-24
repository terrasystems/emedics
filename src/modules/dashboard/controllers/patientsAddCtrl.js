'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('patientsAddCtrl', function($state, http, blockUI, $timeout, alertService, $scope){
		var vm = this;
		console.log('patientsAddCtrl !!!!!');

		vm.model = {};
		vm.fields = [
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
						message: '$viewValue + " is not a valid e-mail address"'
					}
				},
				validation: {
					messages: {
						required: function ($viewValue, $modelValue, scope) {
							return $scope.to.label + ' is required';
						}
					}
				},
				templateOptions: {
					type: 'email',
					required: true,
					label: 'Email address',
					placeholder: 'Enter email'
				}
			}
		];

		vm.onSubmit = function () {
			http.post('private/dashboard/docpatients/create', vm.model.email)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
					$timeout(function () {
						$state.go('main.private.dashboard.abstract.patients');
					}, 500);
				});
		};

	});
