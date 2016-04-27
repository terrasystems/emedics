'use strict';

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
				auth.saveUserData(res.data);
				alertService.add(0,'','Login Ok','');
				$timeout(function () {
					$state.go('main.private.dashboard');
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


	.controller('Registration', function ($rootScope, $scope, $state, reg_fields, $http, $timeout, blockUI, alertService,
										  auth, http) {
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
			var  paramsPOST= {
				"type": vm.tabs[vm.active].type,
				"user": vm.reg[vm.tabs[vm.active].type].user,
				"org": {}
			};
			if  (vm.tabs[vm.active].type=='org') {
				paramsPOST.org = vm.reg[vm.tabs[vm.active].type].org;
				paramsPOST.org.name = vm.reg[vm.tabs[vm.active].type].user.username
			}
			http.post('public/registration', paramsPOST).then(function (res) {
				blockUI.stop();
				auth.saveUserData(res.data);
				alertService.add(0,'','Registration Ok!','');
				$timeout(function () {
					$state.go('main.public.login');
				}, 0);
			});
			//$http.post('/rest/public/registration', paramsPOST)
			//	.then(function (res) {
			//		if  (res.data && res.data.message) {
			//			alertService.add(2,'',res.data.message,'');
			//		}
			//		console.log(res);
			//		$timeout(function () {
			//			$state.go('main.public.login');
			//		}, 0);
			//}, function (res) {
			//	console.log('...error: ');
			//});
		}

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
						$state.go('main.public.login');
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


.service('checkUserAuth', function ($location, localStorageService, $rootScope, alertService) {
	var checkUserAuth = function () {
		var originalPath = $location.path();
		$location.path('/login');
		var authToken = localStorageService.get('token');
		if ((authToken !== undefined) && (authToken !== null)) {
			$rootScope.token = authToken;
			$rootScope.userData = localStorageService.get('userData');
			$location.path(originalPath);
			return;
		}
	};
	return checkUserAuth;
})


//Сервис интерцептора запроса, вставляет токен в хедер
.service('requestInterceptor', function ($rootScope, $q) {
	return {
		'request': function (config) {
			if ($rootScope.token) {
				var authToken = $rootScope.token;
				config.headers['X-Auth-Token'] = authToken;
			}
			return config || $q.when(config);
		}
	};
});
