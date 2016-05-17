'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function ($state) {
		//console.log('..patientNotifCtrl');
		var vm = this;
		vm.UnreadNotifications = [{name: 'Klod', secondName: 'Walkin', msg: 'Check my form #1'},
			{name: 'Fill', secondName: 'Manison', msg: 'I fill form #12'},
			{name: 'Andrew', secondName: 'Frolow', msg: 'Change info'},
			{name: 'Derick', secondName: 'Wolf', msg: 'Can you check info'}];


		//vm.ReadNotifications = [{name: 'Klod', secondName: 'Walkin', msg: 'Check my form #1'},
		//	{name: 'Fill', secondName: 'Manison', msg: 'I fill form #12'},
		//	{name: 'Andrew', secondName: 'Frolow', msg: 'Change info'},
		//	{name: 'Derick', secondName: 'Wolf', msg: 'Can you check info'}];

		//vm.CombineMsg = _.zip(vm.ReadNotifications, vm.UnreadNotifications);
	}
);
