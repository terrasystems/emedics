'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('staffCtrl', function(http, blockUI, $state, localStorageService, DTO) {
		var vm = this;
		vm.user = localStorageService.get('user');
		vm.staff = [];
		vm.search = '';

		if (vm.user.type === 'doctor' && (vm.user.org === 'true' || vm.user.org === true)) {
			vm.canEdit = true;
		} else {
			vm.canEdit = false;
		}

		vm.getStaff = function (val) {
			var criteriaDTO = DTO.criteriaDTO();
			criteriaDTO.search = val;
			return http.post('/staff/all', criteriaDTO)
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.staff = res.result;
					}
					return res.result;
				});
		};
		vm.getStaff('');

		vm.onOpenStuf = function (staf_) {
			$state.go('main.private.dashboard.staff.info', {staff: staf_});
		};

		vm.onEdit = function (id_) {
			$state.go('main.private.dashboard.staff.editor', {id: id_});
		};

	});