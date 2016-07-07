'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function (http,$scope,blockUI, alertService, $rootScope) {
		var vm = this;
		vm.UnreadNotifications = [];
		vm.searchnotif = '';

		vm.onRefreshNotif = function() {
			http.post('private/dashboard/events/notifications/all', { templateId: null, period: null, fromName: null, description: null, formType: null })
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.UnreadNotifications = res.result;
					}
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
