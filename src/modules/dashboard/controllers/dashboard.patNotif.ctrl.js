'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function ($state) {
		//console.log('..patientNotifCtrl');
		var vm = this;
		vm.notifications = [{name: 'Vasia', secondName: 'Piatochkin', msg: 'a ja jebu sobak'},
			{name: 'Vasia', secondName: 'Piatochkin', msg: 'a ja jebu sobak'},
			{name: 'Vasia', secondName: 'Piatochkin', msg: 'a ja jebu sobak'},
			{name: 'Vasia', secondName: 'Piatochkin', msg: 'a ja jebu sobak'}];
	}
);
