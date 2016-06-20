'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('stafCtrl', function(http, blockUI, alertService, $state){
		var vm = this;
		vm.stafs = [];

		console.log('...stafCtrl');

		vm.onRefresh = function() {
			http.get('private/dashboard/dashboard/stuff')
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.stafs = res.result;
					}
				});
		};
		vm.onRefresh();

		vm.onRemove = function (id) {
			http.get('private/dashboard/.../' + id)
				.then(function (res) {
					vm.Refresh();
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.onCreate_ = function(index) {
			$state.go('main.private.dashboard.abstract.stafs.stuffedit', {id: index});
		};

	});
