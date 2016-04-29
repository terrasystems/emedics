'use strict';
/*jshint -W117, -W097*/

angular.module('modules.public', [])


	.controller('LoginCtrl', function ($rootScope, $scope, $state, $http, $timeout, blockUI, alertService, localStorageService,
									   auth, http) {
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
					placeholder: 'Enter email',
					addonRight: {
						class: 'glyphicon glyphicon-user'
					}
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
					placeholder: 'Password',
					addonRight: {
						class: 'glyphicon glyphicon-lock'
					}

				}
			}
		];

		function onSubmit() {
			console.log('submit');
			if (vm.form.$valid) {
				console.log('..Ok!');
				doLogin();
			}
		}

		function doLogin() {
			var paramsPOST = {
				email: vm.user.email,
				password: vm.user.password
			};
			http.post('public/login', paramsPOST).then(function (res) {
				blockUI.stop();
				auth.saveUserData(res);
				alertService.add(0,'','Login Ok','');
				$timeout(function () {
					$state.go('main.private.dashboard.forms');
				}, 0);
			});
			//$http.post('/rest/public/login', {
			//	email: vm.user.email,
			//	password: vm.user.password
			//}).then(function (res) {
			//	blockUI.stop();
			//	if (res.data) {
			//		localStorageService.set('userData', res.data);
			//		localStorageService.set('token', res.data.token);
			//		$rootScope.userData = res.data;
			//		$rootScope.token = res.data.token;
			//		alertService.add(0,'','Login Ok','');
			//		console.log(res);
			//		$timeout(function () {
			//			$state.go('main.private.dashboard');
			//		}, 0);
			//	}
			//}, function (res) {
			//	console.log('...error: '+res);
			//	alertService.add(2,'','Login Failed!','');
			//});
		}
	})


	.controller('RegistrationCtrl', function ($rootScope, $scope, $state, reg_fields, $http, $timeout, blockUI, alertService,
										  auth, http) {
		console.log('..RegistrationCtrl');
		var vm = this;
		vm.reg = {};
		vm.tabs = [];
		vm.regFields = angular.copy(reg_fields);

		angular.forEach(vm.regFields, function(item) {
			if  (item && item.form) {
				item.form.model = vm.reg;
			}
			vm.tabs.push(item);
		});

		vm.active = 0;

		vm.onSubmit = onSubmit;

		function onSubmit() {
			if (!vm.form.$valid) {
				alertService.add(2,'','Need set requere fields!','');
				return;
			}

			var  paramsPOST= {
				"type": vm.tabs[vm.active].type,
				"user": vm.reg[vm.tabs[vm.active].type].user,
				"org": {}
			};
			if  (vm.tabs[vm.active].type==='org') {
				paramsPOST.org = vm.reg[vm.tabs[vm.active].type].org;
				paramsPOST.org.name = vm.reg[vm.tabs[vm.active].type].user.username;
			}
			http.post('public/registration', paramsPOST).then(function (res) {
				blockUI.stop();
				auth.saveUserData(res);
				alertService.add(0,'','Registration Ok!','');
				$timeout(function () {
					$state.go('main.public.login');
				}, 0);
			});
		}

		function selTab(index) {
			vm.active = index;
			vm.tabs.forEach(function(tab, idt) {
				tab.form.fields.forEach(function(field, idf) {
						if  (idt===index) {
							field.templateOptions.required = true;
						} else {
							field.templateOptions.required = false;
						}
					}
				);
			});
		}

		vm.selTab = selTab;
	})


	.controller('NewPasswordCtrl', function ($state, $timeout, http, blockUI) {
		console.log('..NewPasswordCtrl');
		var vm = this;
		vm.forgotPass = '';

		vm.onSubmit = onSubmit;

		vm.fieldforemail = [
			{
				key: 'email',
				type: 'input',
				templateOptions: {
					placeholder: 'Write your email for reset password',
					type: 'email',
					addonRight: {
						class: 'glyphicon glyphicon-envelope'
					}
				}
			}
		];

		function onSubmit() {
			var paramsPOST = vm.forgotPass;
			blockUI.start();
			http.post('public/reset_pass', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					console.log('...reps:'+res);
					$timeout(function () {
						$state.go('main.public.login');
					}, 0);
				}, function (res) {
					blockUI.stop();
					console.log('...error: '+res);
				});
		}
	});
