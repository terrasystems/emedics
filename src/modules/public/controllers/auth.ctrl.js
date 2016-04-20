'use strict';

angular.module('modules.public', [])

.controller('LoginCtrl', function($rootScope, $scope, $state)
	{
		console.log('..LoginCtrl');
		var vm = this;

		vm.user = {};
		vm.userFields = [
			{
				key: 'email',
				type: 'input',
				templateOptions: {
					type: 'email',
					label: 'Email address',
					placeholder: 'Enter email'
				}
			},
			{
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
			console.log('1');
		}
	});
