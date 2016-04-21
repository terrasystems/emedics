'use strict';

angular.module('modules.public', ['ui.bootstrap','ngAnimate'])


	.controller('LoginCtrl', function ($rootScope, $scope, $state, $http, $timeout) {
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
			if  (vm.form.$valid) {
			    console.log('..Ok!');
				doLogin();
			}
		}

		function doLogin() {
			$http.post('/rest/login', {
				user: vm.user.email,
				password: vm.user.password
			}).then(function(res) {
				console.log(res);
				//blockUI.stop();
				//if (res.data.result) {
				//	localStorageService.set('userData', res.data);
				//	$rootScope.userData = res.data;
				//	$rootScope.currentuser = $rootScope.userData.user_name;
				//	localStorageService.set('token', res.data.token);
				//	$rootScope.token = res.data.token;
				//	$timeout(function() {
				//		$state.go('main.private.dashboard', {
				//			reload: true
				//		});
				//	}, 0);
				//} else {
				//	blockUI.stop();
				//	alertService.add(2, res.data.message);
				//}
			}, function(){
				console.log('...error');
				$timeout(function() {
					$state.go('main.private.dashboard');
				}, 0);
			});
		}

	})


	.controller('Registration', function ($rootScope, $scope, $state) {
		console.log('..Registration');
		var vm = this;
		vm.onSubmit = onSubmit;

		function onSubmit() {
			console.log('submit');
			if (vm.form.$valid) {
				console.log('..Ok!');
			}
		}
		vm.patient = {
			FirstName: '',
			LastName:'',
			Emeil: '',
			Password:''
		};
		vm.doctor = {
			FirstName: '',
			LastName:'',
			Emeil: '',
			Password:''
		};
		vm.organization = {
			FirstName: '',
			LastName:'',
			Emeil: '',
			Password:'',
			Website:'',
			OrganizationName:'',
			Address:''
		};
		vm.tabs = [
			{
				title: 'Patient',
				type: 'Patient',
				active: true,
				form: {
					options: {},
					model: vm.patient,
					fields: [
						{
							className: 'col-md-12',
							key: 'FirstName',
							type: 'input',
							templateOptions: {
								label: 'First Name',
								required: true,
								placeholder: 'Enter your First Name'
							}
						},
						{
							className: 'col-md-12',
							key: 'LastName',
							type: 'input',
							templateOptions: {
								label: 'Last Name',
								required: true,
								placeholder: 'Enter your Last Name'
							}
						},
						{
							className: 'col-md-12',
							key: 'Emeil',
							type:'input',
							templateOptions: {
								type: 'email',
								required: true,
								label: 'Email address',
								placeholder: 'Enter email'
							}
						},
						{
							className: 'col-md-12',
							key: 'Password',
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
					model: vm.doctor,
					fields: [
						{
							className: 'col-md-12',
							key: 'FirstName',
							type: 'input',
							templateOptions: {
								label: 'First Name',
								required: true,
								placeholder: 'Enter your First Name'
							}
						},
						{
							className: 'col-md-12',
							key: 'LastName',
							type: 'input',
							templateOptions: {
								label: 'Last Name',
								required: true,
								placeholder: 'Enter your Last Name'
							}
						},
						{
							className: 'col-md-12',
							key: 'Email',
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
							key: 'Password',
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
				type: 'Homecare Organization',
				active: true,
				form: {
					options: {},
					model: vm.organization,
					fields: [
						{
							className: 'col-md-12',
							key: 'FirstName',
							type: 'input',
							templateOptions: {
								label: 'First Name',
								required: true,
								placeholder: 'Enter your First Name'
							}
						},
						{
							className: 'col-md-12',
							key: 'LastName',
							type: 'input',
							templateOptions: {
								label: 'Last Name',
								required: true,
								placeholder: 'Enter your Last Name'
							}
						},
						{
							className: 'col-md-12',
							key: 'Email',
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
							key: 'Password',
							type: 'input',
							templateOptions: {
								type: 'password',
								required: true,
								label: 'Password',
								placeholder: 'Enter password'
							}

						},
						{
							className: 'col-md-12',
							key: 'Website',
							type: 'input',
							templateOptions: {
								label: 'website',
								required: true,
								placeholder: 'Enter your web-site'
							}

						},
						{
							className: 'col-md-12',
							key: 'OrganizationName',
							type: 'input',
							templateOptions: {
								label: 'Organization name',
								required: true,
								placeholder: 'Full organization name'
							}

						},
						{
							className: 'col-md-12',
							key: 'Address',
							type: 'input',
							templateOptions: {
								label: 'Address',
								required: true,
								placeholder: 'Organization Address'
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
