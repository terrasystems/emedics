'use strict';

angular.module('modules.core')

	.service('alertService', function ($rootScope, toastr) {
		var alertService = {};
		alertService.add = function (type, titleText, msg, msgParam) {
			switch (type) {
				case 0:
					type = 'success';
					toastr.success(msg, titleText, msgParam);
					break;
				case 1:
					type = 'warning';
					toastr.warning(msg, titleText, msgParam);
					break;
				case 2:
					type = 'danger';
					toastr.error(msg, titleText, msgParam);
					break;
				default:
					type = 'info';
					toastr.info(msg, titleText, msgParam);
					break;
			}
		};
		return alertService;
	})

	.service('auth', function($rootScope, localStorageService){
		return {
			saveUserData: function (data) {
				if (data.token) {
					$rootScope.token = data.token;
					localStorageService.set('token', data.token);
				}
				if (data.user) {
					$rootScope.userData = data.user;
					localStorageService.set('userData', data.user);
				}
			}
		}
	})

	.service('http', function($http, $q, constants, alertService) {
		function get (url, filter){
			var deferred = $q.defer();
			$http.get(constants.restUrl + url, filter).then(function (resp) {
				if  (resp.data && resp.data.state) {
					if  (resp.data.state.value===true) {
						deferred.resolve(resp.data);
					}
					else {
						deferred.reject(false);
						alertService.add(2, resp.data.state.message)
					}
				}
				else {
					deferred.reject(false);
					alertService.add(2, "don't receive data from server")
				}
			}, function (error) {
				deferred.reject(error);
				alertService.add(2, error.status + ' '+error.statusText)
			});
			return deferred.promise;
		}

		function post (url, params) {
			console.log('post: '+ url);
			var deferred = $q.defer();
			$http.post(constants.restUrl + url, params).then(function (resp) {
				if  (resp.data && resp.data.state) {
					if  (resp.data.state.value===true) {
						deferred.resolve(resp.data);
					}
					else {
						deferred.reject(false);
						alertService.add(2, resp.data.state.message)
					}
				}
				else {
					deferred.reject(false);
					alertService.add(2, "don't receive data from server")
				}
			}, function (error) {
				deferred.reject(error);
				alertService.add(2, error.status + ' '+error.statusText)
			});
			return deferred.promise;
		}

		//******
		return {
			get: get,
			post: post
		}
	})


// Интерцептор для перехвата ошибок
	.service('responseErrorInterceptor', function ($rootScope, $q, $injector, blockUI) {
		return {
			'response': function (response) {
				console.log('int.responce: '+response);
				return response;
			},
			'responseError': function (rejection) {
				console.log('int.rejection: ' + rejection);

				blockUI.reset();

				switch (rejection.status) {
					case 401:
					{
						$injector.get('$state').go('main.public.login',{reload: true});
					//	window.location.reload(true);
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
