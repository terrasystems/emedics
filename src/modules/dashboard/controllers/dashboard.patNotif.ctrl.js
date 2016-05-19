'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function ($state, http, blockUI, initParamsPOST) {
		var vm = this;
		vm.UnreadNotifications = [];

		vm.UnreadNotifications = [{name: 'Klod', secondName: 'Walkin', msg: 'Check my form #1'},
			{name: 'Fill', secondName: 'Manison', msg: 'I fill form #12'},
			{name: 'Andrew', secondName: 'Frolow', msg: 'Change info'},
			{name: 'Derick', secondName: 'Wolf', msg: 'Can you check info'}];

		http.post('private/dashboard/notifications', initParamsPOST.params)
			.then(function (res) {
				blockUI.stop();
				if  (res.result) {
					vm.UnreadNotifications = res.result;
				}
			});

	});
