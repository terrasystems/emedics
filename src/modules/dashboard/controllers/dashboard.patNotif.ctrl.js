'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function (http, blockUI, initParamsPOST) {
		var vm = this;
		vm.UnreadNotifications = [];

		http.post('private/dashboard/notifications', initParamsPOST.params)
			.then(function (res) {
				blockUI.stop();
				if  (res.result) {
					vm.UnreadNotifications = res.result;
				}
			});

	});
