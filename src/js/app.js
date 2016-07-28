'use strict';
/*jshint -W117, -W097*/

var eMedics = angular.module('eMedics', ['ui.router', 'ui.bootstrap', 'formly', 'formlyBootstrap', 'ngMessages',
	'blockUI', 'toastr', 'LocalStorageModule','xeditable', 'pascalprecht.translate', 'base64', /*'ngMockE2E',*/ 'pouchdb',
	'ui.select','ngSanitize','ui.router.tabs', 'angular-confirm',
	//--
	'modules.core', 'modules.auth', 'modules.dash', 'modules.modal']);


eMedics.config(function( statesList, $stateProvider, $urlRouterProvider, formlyConfigProvider, $httpProvider, blockUIConfig,
						 localStorageServiceProvider, $translateProvider/*, $provide*/) {
	angular.forEach(statesList, function(state) {
		$stateProvider.state(state.name, state);
	});
	$urlRouterProvider.otherwise('/signup');

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

	// Translations
	$translateProvider.useStaticFilesLoader({
		prefix: 'i18n/translation_',
		suffix: '.json'
	});
})


.run(function($rootScope, $state, formlyConfig, formlyValidationMessages, auth,$log, /*$httpBackend,*/ constants, $translate,pouchDB) {
	$translate.use('en');

	formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
	formlyValidationMessages.addStringMessage('required', 'This field is required');

	$rootScope.$on('$stateChangeStart', function(event, toState, fromState) { //toParams, fromParams
		if  ( (toState.name).indexOf('private')>-1 ) {
			auth.checkUserAuth();
		}

	});

/*	$httpBackend.whenGET(/^modules\//).passThrough();
	$httpBackend.whenGET(/^i18n\//).passThrough();
	$httpBackend.whenGET(/rest\/public\/.*!/).passThrough();
	$httpBackend.whenPOST(/rest\/public\/.*!/).passThrough();
	$httpBackend.whenGET(/rest\/private\/.*!/).passThrough();
	$httpBackend.whenPOST(/rest\/private\/.*!/).passThrough();

	$httpBackend.whenGET(/template_user\.list/).respond(function () {
		console.log('... mock "template_user.list"');
		return [200, {state: {value: true, message: 'MSG_'}, result: constants.myForms }, {}];
	});

	$httpBackend.whenGET(/template_user\.delete/).respond(function () {
		console.log('... mock "template_user.delete"');
		return [200, {state: {value: true, message: 'MSG_'}, result: [] }, {}];
	});

	$httpBackend.whenGET(/template\.list/).respond(function () {
		console.log('... mock "template.list"');
		return [200, {state: {value: true, message: 'MSG_'}, result: constants.formTemplate }, {}];
	});*/

});
