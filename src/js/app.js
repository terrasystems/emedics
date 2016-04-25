'use strict';

/* App Module */

var eMedics = angular.module('eMedics', ['ui.router', 'ui.bootstrap', 'formly', 'formlyBootstrap', 'ngMessages', 'ngAnimate',
	'blockUI', 'toastr',
	//--
	'modules.core', 'modules.public', 'modules.dashboard']);

eMedics.config(function( statesList, $stateProvider, $urlRouterProvider, formlyConfigProvider, $httpProvider, blockUIConfig) {
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
})


.run(function($state, formlyConfig, formlyValidationMessages) {
		formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
		formlyValidationMessages.addStringMessage('required', 'This field is required');
}

);
