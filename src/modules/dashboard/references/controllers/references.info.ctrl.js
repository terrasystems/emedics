'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('referencesInfoCtrl', function ($stateParams, $state) {
		var vm = this;
		vm.ref = $stateParams.ref;

		if (!$stateParams.ref || $stateParams.ref === '' || $stateParams.ref === null) {
			$state.go('main.private.dashboard.references');
			return;
		}

		vm.onReturn = function() {
			$state.go('main.private.dashboard.references');
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().slice(0,10);
		};

	});