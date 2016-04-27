'use strict';

angular.module('modules.patnotif', [])

	.controller('NotificationsCtrl', function($rootScope, $scope, $state)
	{
		console.log('.....notificationsCtrl!!!');
		var vm = this;
		vm.notifications=[{name:'Vasia',secondName:'Piatochkin',msg:'a ja jebu sobak'},
			{name:'Vasia',secondName:'Piatochkin',msg:'a ja jebu sobak'},
			{name:'Vasia',secondName:'Piatochkin',msg:'a ja jebu sobak'},
			{name:'Vasia',secondName:'Piatochkin',msg:'a ja jebu sobak'}];
	}

);
