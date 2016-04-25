'use strict';

angular.module('modules.public', ['ui.bootstrap', 'ngAnimate', 'modules.core'])


	.controller('LoginCtrl', function ($rootScope, $scope, $state, $http, $timeout, blockUI, alertService) {
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
			$http.post('/rest/public/login', {
				email: vm.user.email,
				password: vm.user.password
			}).then(function (res) {
				alertService.add(0,'','Login Ok','');
				console.log(res);
				$timeout(function () {
					$state.go('main.private.dashboard');
				}, 0);
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
			}, function (res) {
				console.log('...error: '+res);
				alertService.add(2,'','Login Failed!','');
			});
		}

	})


	.controller('Registration', function ($rootScope, $scope, $state, reg_fields, $http, $timeout, blockUI) {
		console.log('..Registration');
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
			console.log('submit');
			//console.log(vm.tabs[vm.active].type); console.log(vm.reg[vm.tabs[vm.active].type]);

			var  sendPOST= {
				"type": vm.tabs[vm.active].type,
				"user": vm.reg[vm.tabs[vm.active].type].user,
				"org": {}
			};
			if  (vm.tabs[vm.active].type=='org') {
				sendPOST.org = vm.reg[vm.tabs[vm.active].type].org;
				sendPOST.org.name = vm.reg[vm.tabs[vm.active].type].user.username
			}
			console.log(JSON.stringify(sendPOST));


			$http.post('/rest/public/registration', sendPOST)
				.then(function () {
					//console.log(res);
					$timeout(function () {
					$state.go('main.private.dashboard');
				}, 0);

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
			}, function () {
				console.log('...error: ');
			});
			//if (vm.form.$valid) {
			//	console.log('..Ok!');
			//}
		}

		function selTab(index) {
			console.log(index);
		}

		vm.selTab = selTab();

	})


	.controller('NewPassword', function ($state, $timeout, $http, blockUI) {
		console.log('..NewPassword');
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
			var sendPOST = vm.forgotPass;
			blockUI.start();
			$http.post('/rest/public/reset_pass', sendPOST)
				.then(function (res) {
					blockUI.stop();
					console.log('...reps:'+res);
					$timeout(function () {
						$state.go('main.private.dashboard');
					}, 0);
				}, function (res) {
					blockUI.stop();
					console.log('...error: '+res);
				});
		}
	})


// Интерцептор для перехвата ошибок
.service('responseErrorInterceptor', function ($rootScope, $q, $injector, blockUI) {
	return {
		'response': function (response) {
			console.log('int.responce: '+response);
			//if (response.data.alerts != null)  $injector.get('alertService').addAlerts(response.data.alerts);
            //
			//if  (response.data && response.data.result == 'false' && response.data.message == '401')
			//{
			//	blockUI.reset();
			//	delete $rootScope.userData;
			//	delete $rootScope.token;
			//	localStorageService.remove('token');
			//	localStorageService.remove('userData');
			//	$rootScope.isMenuExists = false;
			//	window.location.reload(true);
			//}
            //
			//switch (response.data.status) {
			//	case '400':
			//	{
			//		blockUI.reset();
			//		return $q.reject(response);
			//	}
			//	default:
			//		return response;
			//}
			return response;
		},
		'responseError': function (rejection) {
			console.log('int.rejection: ' + rejection);

			blockUI.reset();

			switch (rejection.status) {
				case 401:
				{
					$injector.get('$state').go('main.public.login',{reload: true});
					window.location.reload(true);
					break;
				}
				default:
				{
					console.log(rejection);
					break;
				}
			}
			return $q.reject(rejection);
		}
	};
})
