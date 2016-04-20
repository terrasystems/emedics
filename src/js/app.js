'use strict';

/* App Module */

var eMedics = angular.module('eMedics', ['ui.router', 'modules.core', 'modules.public', 'ui.bootstrap','formly', 'formlyBootstrap']);

eMedics.config(function( $statesList, $stateProvider, $urlRouterProvider) {

	$stateProvider.state('login222', {
		url: '/login',
		templateUrl: 'modules/public/views/login.html',
		controller: 'LoginCtrl'
	});
	$urlRouterProvider.otherwise('login');
})

	.run(function() {

	});
