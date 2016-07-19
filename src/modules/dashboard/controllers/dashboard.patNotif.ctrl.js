'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function (http,$scope,blockUI, alertService, $rootScope, DTO) {
		var vm = this;
		vm.UnreadNotifications = [];

		vm.onRefreshNotif = function(val) {
			return http.post('private/dashboard/events/notifications/all', DTO.getNotif)
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.UnreadNotifications = res.result;
					}
					return res.result;
				});
		};
		vm.onRefreshNotif();

		vm.onAccept = function (id) {
			http.get('private/dashboard/events/notifications/accept/'+id)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
						$rootScope.$broadcast('calc.notif');
					}
					vm.onRefreshNotif();
				});
		};

		$rootScope.$broadcast('calc.notif');

		vm.onDecline = function (id) {
			http.get('private/dashboard/events/notifications/decline/'+id)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
						$rootScope.$broadcast('calc.notif');
					}
					vm.onRefreshNotif();
				});
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().replace(',', ' / ');
		};

	});
