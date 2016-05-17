'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksCtrl', function ( $state, blockUI, http, localStorageService) {
		console.log('..patientTasksCtrl');
		var vm = this;
		vm.page = {};
		vm.list = [];
		vm.user = localStorageService.get('userData');
		//vm.list = $stateParams.activeForms;

		var paramsPOST = {"page": {"start": 0, "count": 20}, "criteria": {}};

		http.post('private/dashboard/' + vm.user.type + '/forms/active', paramsPOST)
			.then(function (res) {
				blockUI.stop();
				if (res.result /*&& res.page*/) {
					vm.list = res.result;
					vm.page = res.page;
				}
			});


		vm.onClick = function (index) {
			console.log(index + ' !!!!');
			$state.go('main.private.dashboard.tasks.edit', {id: index});
		};


	}
);

