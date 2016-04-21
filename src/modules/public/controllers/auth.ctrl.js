'use strict';

angular.module('modules.public', [])


	.controller('LoginCtrl', function ($rootScope, $scope, $state) {
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
					required: true,
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
					required: true,
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


	.controller('Registration', function ($rootScope, $scope, $state) {
		console.log('..Registration');
		var vm = this;

		vm.model = {};

		vm.tabs = [
			{

				title: 'Patient',
				type: 'Patient',
				active: true,
				form: {
					options: {},
					model: vm.model,
					fields: [
						{
							className: 'col-md-6',
							key: 'firstName',
							type: 'input',
							templateOptions: {
								label: 'First Name',
								required: true,
								placeholder:'Enter your First Name'
							}

						},
						{
							className: 'col-md-6',
							key: 'lastName',
							type: 'input',
							templateOptions: {
								label: 'Last Name',
								required: true,
								placeholder:'Enter your Last Name'
							}

						},
						{
							className: 'col-md-6',
							key: 'email',
							type: 'input',
							templateOptions: {
								type: 'email',
								required: true,
								label: 'Email address',
								placeholder: 'Enter email'
							}

						},
						{
							className: 'col-md-6',
							key: '',
							type: 'input',
							templateOptions: {
								type: 'password',
								required: true,
								label: 'Password',
								placeholder: 'Enter password'
							}

						}

					]
				}
			},
			{
				title: 'Doctor',
				type: 'Doctor',
				form: {
					model: vm.model,
					fields: [
						{
							className: 'col-md-6',
							key: 'firstName',
							type: 'input',
							templateOptions: {
								label: 'First Name',
								required: true,
								placeholder:'Enter your First Name'
							}

						},
						{
							className: 'col-md-6',
							key: 'lastName',
							type: 'input',
							templateOptions: {
								label: 'Last Name',
								required: true,
								placeholder:'Enter your Last Name'
							}

						},
						{
							className: 'col-md-6',
							key: 'email',
							type: 'input',
							templateOptions: {
								type: 'email',
								required: true,
								label: 'Email address',
								placeholder: 'Enter email'
							}

						},
						{
							className: 'col-md-6',
							key: '',
							type: 'input',
							templateOptions: {
								type: 'password',
								required: true,
								label: 'Password',
								placeholder: 'Enter password'
							}

						}
					]
				}
			},
			{
				title: 'Homecare Organization',
				type:'Homecare Organization',
				active: true,
				form: {
					options: {},
					model: vm.model,
					fields: [
						{
							className: 'col-md-6',
							key: 'firstName',
							type: 'input',
							templateOptions: {
								label: 'First Name',
								required: true,
								placeholder:'Enter your First Name'
							}

						},
						{
							className: 'col-md-6',
							key: 'lastName',
							type: 'input',
							templateOptions: {
								label: 'Last Name',
								required: true,
								placeholder:'Enter your Last Name'
							}

						},
						{
							className: 'col-md-6',
							key: 'email',
							type: 'input',
							templateOptions: {
								type: 'email',
								required: true,
								label: 'Email address',
								placeholder: 'Enter email'
							}

						},
						{
							className: 'col-md-6',
							key: '',
							type: 'input',
							templateOptions: {
								type: 'password',
								required: true,
								label: 'Password',
								placeholder: 'Enter password'
							}

						}

					]
				}
			}
		];

	})


	.controller('NewPassword', function ($rootScope, $scope, $state) {
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
