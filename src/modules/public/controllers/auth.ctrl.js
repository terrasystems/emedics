'use strict';

angular.module('modules.public', [])

.controller('LoginCtrl', function($rootScope, $scope, $state)
	{
		console.log('..LoginCtrl');
		var vm = this;

		vm.user = {};
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

		function submit() {
			console.log('1');
		}
	});
