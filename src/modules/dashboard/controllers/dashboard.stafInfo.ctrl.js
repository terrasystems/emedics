'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('stafInfoCtrl', function ($stateParams, $state, localStorageService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.staf = $stateParams.staf;

		if (!$stateParams.staf || $stateParams.staf === '' || $stateParams.staf === null) {
			$state.go('main.private.dashboard.abstract.stafs');
			return;
		}

		if (vm.user.type === 'doctor' && (vm.user.org === 'true' || vm.user.org === true)) {
			vm.canEdit = true;
		} else {
			vm.canEdit = false;
		}

		vm.onReturn = function() {
			$state.go('main.private.dashboard.abstract.stafs');
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().slice(0,10);
		};

		vm.onEdit = function () {
			$state.go('main.private.dashboard.abstract.stafs.stuffedit', {id: vm.staf.id});
		};

	});