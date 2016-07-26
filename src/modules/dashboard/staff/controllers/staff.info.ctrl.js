'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('staffInfoCtrl', function ($stateParams, $state, localStorageService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.staff = $stateParams.staff;

		if (!$stateParams.staff || $stateParams.staff === '' || $stateParams.staff === null) {
			$state.go('main.private.dashboard.staff');
			return;
		}

		if (vm.user.type === 'doctor' && (vm.user.org === 'true' || vm.user.org === true)) {
			vm.canEdit = true;
		} else {
			vm.canEdit = false;
		}

		vm.onReturn = function() {
			$state.go('main.private.dashboard.staff');
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().slice(0,10);
		};

		vm.onEdit = function () {
			$state.go('main.private.dashboard.staff.editor', {id: vm.staff.id});
		};

	});