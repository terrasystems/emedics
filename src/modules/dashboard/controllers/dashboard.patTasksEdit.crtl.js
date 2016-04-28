'use strict';


angular.module('modules.dash')

	.controller('patientTasksEditCtrl', function($rootScope, $state, $http, constants, $stateParams) {
		console.log('..patientTasksEditCtrl');
		var vm = this;
		vm.email='111111';
		vm.users = {email:'1'};
		vm.option = {};
		vm.userField = [
			{
				className: 'col-md-12',
				key: 'email',
				type: 'input',
				templateOptions: {
					type: 'text',
					label: 'Full name',
					placeholder: 'Enter Full name'

				}
			}

		];

	}
);