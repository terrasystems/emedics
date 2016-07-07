'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('stafCtrl', function(http, blockUI, alertService, $state, localStorageService){
		var vm = this;
		vm.stafs = [];
		vm.user = localStorageService.get('userData');

		if (vm.user.type === 'doctor' && (vm.user.org === 'true' || vm.user.org === true)) {
			vm.canEdit = true;
		} else {
			vm.canEdit = false;
		}

		vm.onRefresh = function() {
			http.post('private/dashboard/stuff', {name: ''})
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.stafs = res.result;
					}
				});
		};
		vm.onRefresh();

		vm.onEdit = function (index) {
			$state.go('main.private.dashboard.abstract.stafs.stuffedit', {id: index});
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().slice(0,10);
		};

	});
