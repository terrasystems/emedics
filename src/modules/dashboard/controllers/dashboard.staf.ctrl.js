'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('stafCtrl', function(http, blockUI, alertService, $state, localStorageService){
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
			return http.post('private/dashboard/stuff', {name: val})
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.stafs = res.result;
					}
					return res.result;
				});
		};
		vm.getFindStuffs('');

		vm.onEdit = function (index) {
			$state.go('main.private.dashboard.abstract.stafs.stuffedit', {id: index});
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().slice(0,10);
		};

	});
