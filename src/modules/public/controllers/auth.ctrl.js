'use strict';

angular.module('modules.public', [])


.controller('LoginCtrl', function($rootScope, $scope, $state)
	{
		console.log('..LoginCtrl');
		var vm = this;
		vm.onSubmit = onSubmit;

		vm.user = {};
		vm.options = {};
		vm.userFields = [
			{
				className: 'col-md-12',
				key: 'email',
				type: 'input',
				templateOptions: {
					type: 'email',
					label: 'Email address',
					placeholder: 'Enter email'
				}
			},
			{
				className: 'col-md-12',
				key: 'password',
				type: 'input',
				templateOptions: {
					type: 'password',
					label: 'Password',
					placeholder: 'Password'
				}
			}
		];

		function onSubmit() {
			console.log('submit');
			if (vm.form.$valid) {
			   console.log('..Ok!');
			}
		}
	})


.controller('Registration', function($rootScope, $scope, $state)
	{
		console.log('..Registration');
		var vm = this;
		vm.onSubmit = onSubmit;

		function onSubmit() {
			console.log('submit');
			if (vm.form.$valid) {
				console.log('..Ok!');
			}
		}
	})


.controller('NewPassword', function($rootScope, $scope, $state)
	{
		console.log('..NewPassword');
		var vm = this;
		vm.onSubmit = onSubmit;

		function onSubmit() {
			console.log('submit');
			if (vm.form.$valid) {
				console.log('..Ok!');
			}
		}
	}
);
