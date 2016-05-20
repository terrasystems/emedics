'use strict';
/*jshint -W117, -W097*/

var eMedics = angular.module('eMedics', ['ui.router', 'ui.bootstrap', 'formly', 'formlyBootstrap', 'ngMessages', 'ngAnimate',
	'blockUI', 'toastr', 'LocalStorageModule','xeditable',// 'ngMockE2E',
	//--
	'modules.core', 'modules.public', 'modules.dash','ui.select','ngSanitize']);


eMedics.config(function( statesList, $stateProvider, $urlRouterProvider, formlyConfigProvider, $httpProvider, blockUIConfig,
						 localStorageServiceProvider, $provide) {
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


.run(function($rootScope, $state, formlyConfig, formlyValidationMessages, checkUserAuth, $httpBackend, constants) {

	formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
	formlyValidationMessages.addStringMessage('required', 'This field is required');

	$rootScope.$on('$stateChangeStart', function(event, toState, fromState) { //toParams, fromParams
		if  ( (toState.name).indexOf('private')>-1 ) {
			checkUserAuth();
		}
	});
}

	//$httpBackend.whenGET(/^modules\//).passThrough();
    //
	//if (constants.isDEBUG === '1') {
	//	$httpBackend.whenGET('private/dashboard/references').respond(function () {
	//		console.log("Getting phones");
	//		return [200, {id: 'eeeee'}, {}];
	//	});
	//	$httpBackend.whenPOST(/.*/).passThrough();
	//	$httpBackend.whenGET(/.*/).passThrough();
	//}
	//else {
	//	//$httpBackend.whenGET(/.*/).passThrough();
	//	//$httpBackend.whenPOST(/.*/).passThrough();
	//}

);
