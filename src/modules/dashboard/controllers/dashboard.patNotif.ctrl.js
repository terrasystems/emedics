'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function (http,$scope,blockUI, initParamsPOST, alertService) {
		var vm = this;
		vm.UnreadNotifications = [];
		vm.searchnotif = '';
		vm.onRefreshNotif = onRefreshNotif;

		function onRefreshNotif() {
			http.post('private/dashboard/notifications', initParamsPOST.params)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						//if (angular.isArray(res.result) && res.result.length > 0) {
							vm.UnreadNotifications = res.result;
						//}
						$scope.$emit('NotifCount', 	vm.UnreadNotifications);
					}
				});
		}

		vm.onRefreshNotif();

		vm.onAccept = function (id) {
			console.log('accept id: '+id);
			http.get('private/dashboard/notifications/accept/'+id)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {

					}
					vm.onRefreshNotif();
				});
		};

		vm.onDecline = function (id) {
			console.log('decline id: '+id);
			http.get('private/dashboard/notifications/decline/'+id)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
					vm.onRefreshNotif();
				});
		};

	});
