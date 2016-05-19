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
		}
	})


	.controller('RegistrationCtrl', function ($rootScope, $scope, $state, pat_fields, doc_fields, org_fields, $http, $timeout, blockUI, alertService, auth, http) {
		var vm = this;
		vm.pat_fields = angular.copy(pat_fields);
		vm.doc_fields = angular.copy(doc_fields);
		vm.org_fields = angular.copy(org_fields);

		vm.reg = {pat:{}, doc:{}, org: {}};

		vm.tabs = [
			{
				title: 'Patient',
				active: true,
				index : 0,
				type: 'pat',
				form: {
					options: {},
					model: vm.reg.pat,
					fields: vm.pat_fields
				}
			},
			{
				title: 'Doctor',
				active: false,
				index : 1,
				type: 'doc',
				form: {
					options: {},
					model: vm.reg.doc,
					fields: vm.doc_fields
				}
			},
			{
				title: 'Homecare Organization',
				active: false,
				index : 2,
				type: 'org',
				form: {
					options: {},
					model: vm.reg.org,
					fields: vm.org_fields
				}
			}
		];

		vm.active = 0;

		vm.onSubmit = onSubmit;

		function onSubmit() {
			var  paramsPOST= {
				"type": vm.tabs[vm.active].type,
				"user": vm.reg[vm.tabs[vm.active].type].user,
				"organisation": {}
			};
			if  (vm.tabs[vm.active].type==='org') {
				paramsPOST.organisation = vm.reg[vm.tabs[vm.active].type].org;
				paramsPOST.organisation.name = vm.reg[vm.tabs[vm.active].type].user.username;
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
			console.log('set <Tab ID>: = '+index);
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
