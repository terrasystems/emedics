'use strict';
/*jshint	-W117*/

angular.module('modules.patnotif', [])

	.controller('patientNotifCtrl', function ($state) {
		console.log('..patientNotifCtrl');
		var vm = this;
		vm.notifications = [{name: 'Vasia', secondName: 'Piatochkin', msg: 'a ja jebu sobak'},
			{name: 'Vasia', secondName: 'Piatochkin', msg: 'a ja jebu sobak'},
			{name: 'Vasia', secondName: 'Piatochkin', msg: 'a ja jebu sobak'},
			{name: 'Vasia', secondName: 'Piatochkin', msg: 'a ja jebu sobak'}];
	}
);
