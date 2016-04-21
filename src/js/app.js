'use strict';

/* App Module */

var eMedics = angular.module('eMedics', ['ui.router', 'ui.bootstrap', 'formly', 'formlyBootstrap', 'ngMessages', 'ngAnimate',
	//--
	'modules.core', 'modules.public', 'modules.dashboard' ]);

eMedics.config(function( statesList, $stateProvider, $urlRouterProvider, formlyConfigProvider) {
	angular.forEach(statesList, function(state) {
		$stateProvider.state(state.name, state);
	});

	$urlRouterProvider.otherwise('/login');

	formlyConfigProvider.setWrapper({
		name: 'validation',
		types: ['input'],
		templateUrl: 'error-messages.html'
	});

})


.run(function($state, formlyConfig, formlyValidationMessages) {
		formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
		formlyValidationMessages.addStringMessage('required', 'This field is required');
}

);
