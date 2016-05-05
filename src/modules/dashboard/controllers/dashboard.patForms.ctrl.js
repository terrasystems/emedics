'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientFormsCtrl', function ($state, $filter, http, localStorageService, blockUI) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.patientForms = [];

		var paramsPOST = {"page": {"start": 0,"count": 20},"criteria": {}};

		http.post('private/dashboard/'+vm.user.type+'/forms', paramsPOST)
			.then(function (res) {
				blockUI.stop();
				if  (res.result /* && res.page */) {
					vm.patientForms = res.result;
					vm.page = res.page;
				}
			});

		vm.save = function () {
			vm.result = $filter('filter')(vm.patientForms, {active: true});
			paramsPOST.criteria.list = [];

			vm.result.forEach(function(item, index) {
				if (item.active && item.active===true && item.id)	{
					paramsPOST.criteria.list.push(item.id);
				}
			})

			http.post('private/dashboard/'+vm.user.type+'/forms/active/modify', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					console.log(res);
					$state.go('main.private.dashboard.tasks');
					//$state.go('main.private.dashboard.tasks', {activeForms: $filter('filter')(vm.patientForms, {active: true})});
				});

		};

	});
