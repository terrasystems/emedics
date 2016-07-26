(function () {
	"use strict";
	/*jshint -W117, -W097, -W089, -W061*/

	angular.module('modules.core')

		.service('auth', function ($rootScope, localStorageService) {
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
			};
		});
})();