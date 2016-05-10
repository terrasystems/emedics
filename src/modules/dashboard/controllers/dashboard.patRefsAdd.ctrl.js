'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')

	.controller('patientReferencesAddCtrl', function ($state) {
		console.log('..patientReferencesAddCtrl');
		var vm = this;

		vm.model = {};

		vm.fields = [
					{
						className: 'col-md-12',
						key: 'username',
						type: 'input',
						templateOptions: {
							label: 'Name',
							required: false,
							placeholder: 'Enter Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'email',
						type: 'input',
						templateOptions: {
							type: 'email',
							required: false,
							label: 'Email address',
							placeholder: 'Enter email'
						}
					}
					];

		vm.onSubmit = function () {
			$state.go('main.private.dashboard.ref');
		};

	}
);