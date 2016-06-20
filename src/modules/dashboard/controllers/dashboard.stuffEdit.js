'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('stuffEditCtrl', function(http, blockUI, alertService, $state, $stateParams){
		var vm = this;
		console.log($stateParams.id);

		if (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go('main.private.dashboard.abstract.stafs');
			return;
		}


	});