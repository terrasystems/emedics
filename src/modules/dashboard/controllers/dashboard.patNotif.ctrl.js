'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function (http,$scope,blockUI, initParamsPOST, alertService, $rootScope) {
		var vm = this;
		vm.UnreadNotifications = [];
		vm.searchnotif = '';

		vm.onRefreshNotif = function() {
			http.post('private/dashboard/notifications', initParamsPOST.params)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.UnreadNotifications = res.result;
					}
				});
		};
		vm.onRefreshNotif();

		vm.onAccept = function (id) {
			console.log('accept id: '+id);
			http.get('private/dashboard/notifications/accept/'+id)
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
			console.log('decline id: '+id);
			http.get('private/dashboard/notifications/decline/'+id)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
						$rootScope.$broadcast('calc.notif');
					}
					vm.onRefreshNotif();
				});
		};

	});
