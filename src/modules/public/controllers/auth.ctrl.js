'use strict';
/*jshint -W117, -W097*/

angular.module('modules.public', [])

	.controller('LoginCtrl', function ($state, $timeout, blockUI, alertService, auth, http) {
		var vm = this;
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

		vm.onSubmit = function() {
			if (vm.form.$valid) {
				doLogin();
			}
		};

		function doLogin() {
			var paramsPOST = {
				email: vm.user.email,
				password: vm.user.password
			};
			http.post('public/login', paramsPOST).then(function (res) {
				blockUI.stop();
				auth.saveUserData(res);
				alertService.add(0, '', res.state.message, '');
				$timeout(function () {
					$state.go('main.private.dashboard.tasks');
				}, 0);
			});
		}

	})


	.controller('RegistrationCtrl', function ($state, pat_fields, doc_fields, org_fields, $timeout, blockUI, alertService, auth, http) {
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

		vm.onSubmit = function () {
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
				alertService.add(0, '', res.state.message, '');
				$timeout(function () {
					$state.go('main.public.login');
				}, 0);
			});
		};

		function selTab(index) {
			vm.active = index;
		}

		vm.selTab = selTab;
	})


	.controller('NewPasswordCtrl', function ($state, $timeout, http, blockUI, alertService) {
		var vm = this;
		vm.forgotPass = '';

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

		vm.onSubmit = function () {
			var paramsPOST = vm.forgotPass.email;
			blockUI.start();
			http.post('public/reset_pass', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, '', res.state.message, '');
					$timeout(function () {
						$state.go('main.public.login');
					}, 0);
				}, function (res) {
					blockUI.stop();
				});
		};

	});
