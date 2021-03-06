'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksCtrl', function ($rootScope, $state, $stateParams, blockUI, http, localStorageService) {
		console.log('..patientTasksCtrl');
		var vm = this;
		vm.page = {};
		vm.list = [];
		vm.user = localStorageService.get('userData');
		vm.list = $stateParams.activeForms;

		var paramsPOST = {
			"page": {
				"start": 0,
				"count": 20
			},
			"criteria": {}
		};

		http.post('private/dashboard/'+vm.user.type+'/forms/active', paramsPOST)
			.then(function (res) {
				blockUI.stop();
				if  (res.list && res.page) {
					vm.list = res.list;
					vm.page = res.page;
				}
			});
	}
);
