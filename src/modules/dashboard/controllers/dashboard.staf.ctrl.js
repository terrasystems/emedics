'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('stafCtrl', function(http, blockUI, $state, localStorageService, DTO) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.stafs = [];
		vm.temp_ = '';

		if (vm.user.type === 'doctor' && (vm.user.org === 'true' || vm.user.org === true)) {
			vm.canEdit = true;
		} else {
			vm.canEdit = false;
		}

		vm.getFindStuffs = function (val) {
			var paramPOST = DTO.filters;
			paramPOST.name = val;
			return http.post('private/dashboard/stuff', paramPOST)
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.stafs = res.result;
					}
					return res.result;
				});
		};
		vm.getFindStuffs('');

		vm.onOpenStuf = function (staf_) {
			$state.go('main.private.dashboard.abstract.stafs.info', {staf: staf_});
		};

		vm.onEdit = function (id_) {
			$state.go('main.private.dashboard.abstract.stafs.stuffedit', {id: id_});
		};

	});