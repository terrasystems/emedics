(function () {
	"use strict";
	/*jshint -W117, -W097, -W089, -W061*/

	angular.module('modules.core')

		.service('auth', function ($rootScope, localStorageService, $location) {
			return {
				saveUserData: function (data) {
					if (data.token) {
						$rootScope.token = data.token;
						localStorageService.set('token', data.token);
					}
					if (data.userDto) {
						$rootScope.user = data.userDto;
						localStorageService.set('user', data.userDto);
					}
				},
				checkUserAuth: function () {
					var originalPath = $location.path();
					$location.path('/login');
					var authToken = localStorageService.get('token');
					if ((authToken !== undefined) && (authToken !== null)) {
						$rootScope.token = authToken;
						$rootScope.user = localStorageService.get('user');
						$location.path(originalPath);
						return;
					}
				}
			};
		})
//Request interceptor service , set token into header
		.service('requestInterceptor', function ($rootScope, $q) {
			return {
				'request': function (config) {
					if ($rootScope.token) {
						var authToken = $rootScope.token;
						config.headers['X-Auth-Token'] = authToken;
						$rootScope.$broadcast('change.username');
					}
					return config || $q.when(config);
				}
			};
		})

   // this interceptor catch errors from responce
		.service('responseErrorInterceptor', function ($rootScope, $q, $injector, blockUI, $log) {
			return {
				'response': function (response) {
					//console.log('int.responce: '+response);
					return response;
				},
				'responseError': function (rejection) {
					//console.log('int.rejection: ' + rejection);

					blockUI.reset();

					switch (rejection.status) {
						case 401:
						{
							$injector.get('$state').go('main.public.login', {reload: true});
							break;
						}
						case 404:
						{
							$log.debug(rejection.statusText);
							break;
						}
						default:
						{
							$log.debug(rejection);
							break;
						}
					}
					return $q.reject(rejection);
				}
			};
		});
})();