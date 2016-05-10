'use strict';
/*jshint -W117, -W097*/

var eMedics = angular.module('eMedics', ['ui.router', 'ui.bootstrap', 'formly', 'formlyBootstrap', 'ngMessages', 'ngAnimate',
	'blockUI', 'toastr', 'LocalStorageModule','xeditable',
	//--
	'modules.core', 'modules.public', 'modules.dash']);


eMedics.config(function( statesList, $stateProvider, $urlRouterProvider, formlyConfigProvider, $httpProvider, blockUIConfig,
						 localStorageServiceProvider) {
	angular.forEach(statesList, function(state) {
		$stateProvider.state(state.name, state);
	});

	$urlRouterProvider.otherwise('/login');

	formlyConfigProvider.setWrapper({
		name: 'validation',
		types: ['input'],
		templateUrl: 'error-messages.html'
	});

	blockUIConfig = {
		delay: 100,
		autoInjectBodyBlock: false,
		autoBlock: false,
		resetOnException: true
	};

	// Interceptors
	$httpProvider.interceptors.push('responseErrorInterceptor');
	$httpProvider.interceptors.push('requestInterceptor');

	// Local storage Prefix
	localStorageServiceProvider.setPrefix('emed');
})


.run(function($rootScope, $state, formlyConfig, formlyValidationMessages, checkUserAuth) {

	formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
	formlyValidationMessages.addStringMessage('required', 'This field is required');

	$rootScope.$on('$stateChangeStart', function(event, toState, fromState) { //toParams, fromParams
		if  ( (toState.name).indexOf('private')>-1 ) {
				checkUserAuth();
		}
	});
}


);
