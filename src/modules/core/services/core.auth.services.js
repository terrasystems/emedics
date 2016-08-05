(function () {
	/*jshint -W117, -W097, -W089, -W061*/


	function auth($rootScope, localStorageService, $location, $log, http, $state) {
		function saveUserData (data) {
			if (data.token) {
				$rootScope.token = data.token;
				localStorageService.set('token', data.token);
			}
			if (data.userDto) {
				$rootScope.user = data.userDto;
				localStorageService.set('user', data.userDto);
			}
		};
		function activateUser (code) {
			http.get('/auth/activate/' + code).then(function (resp) {
				$log.debug(resp);
				if (resp.state) {
					saveUserData(resp.result);
					$state.go('main.dashboard.catalog', {reload: true});
				}
			});
		};
		function checkUserAuth () {
			var originalPath = $location.path();
			$location.path('/login');
			var authToken = localStorageService.get('token');
			if (authToken) {
				$rootScope.token = authToken;
				$rootScope.user = localStorageService.get('user');
				$location.path(originalPath);
				return;
			}
		}
		return {
			saveUserData: saveUserData,
			activateUser: activateUser,
			checkUserAuth: checkUserAuth
		};
	};

//Request interceptor service , set token into header
	function requestInterceptor($rootScope, $q) {
		return {
			'request': function (config) {
				if ($rootScope.token) {
					config.headers['X-Auth-Token'] = $rootScope.token;
					$rootScope.$broadcast('change.username');
				}
				return config || $q.when(config);
			}
		};
	};

// this interceptor catch errors from responce
	function responseErrorInterceptor ($q, $injector, blockUI, $log) {
		return {
			'response': function (response) {
				return response;
			},
			'responseError': function (rejection) {
				blockUI.reset();

				switch (rejection.status) {
					case 401:
					{
						$injector.get('$state').go('main.auth.login', {reload: true});
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
	};

	angular.module('modules.core')
		.service('auth', auth)
		.service('requestInterceptor', requestInterceptor)
		.service('responseErrorInterceptor', responseErrorInterceptor);
})();