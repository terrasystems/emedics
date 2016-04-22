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


	.controller('Registration', function ($rootScope, $scope, $state, reg_fields) {
		console.log('..Registration');
		var vm = this;
		vm.reg = {};
		vm.tabs = [];

		angular.forEach(reg_fields, function(item) {
			if  (item && item.form) {
				item.form.model = vm.reg;
			}
			vm.tabs.push(item);
		});

		vm.onSubmit = onSubmit;
		function onSubmit() {
			console.log('submit');
			console.log('vm.reg: '+JSON.stringify(vm.reg,'',4));
			if (vm.form.$valid) {
				console.log('..Ok!');
			}
		}

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
