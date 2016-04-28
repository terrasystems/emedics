'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function ($state) {
		//console.log('..patientNotifCtrl');
		var vm = this;
		vm.notifications = [{name: 'Klod', secondName: 'Walkin', msg: 'Check my form #1'},
			{name: 'Fill', secondName: 'Manison', msg: 'I fill form #12'},
			{name: 'Andrew', secondName: 'Frolow', msg: 'Change info'},
			{name: 'Derick', secondName: 'Wolf', msg: 'Can you check info'}];
	}
);
