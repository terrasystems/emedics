'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksCtrl', function ($scope, $rootScope,constants,$stateParams,$state, blockUI, http, localStorageService) {

		console.log('..patientTasksCtrl');
		var vm = this;
		vm.page = {};
		vm.list = [];
		vm.user = localStorageService.get('userData');
		//vm.list = $stateParams.activeForms;
		vm.sections = [];
		vm.options = [];
		vm.sectionsName = [];

		var paramsPOST = {"page": {"start": 0, "count": 20}, "criteria": {}};

		http.post('private/dashboard/' + vm.user.type + '/forms/active', paramsPOST)
			.then(function (res) {
				blockUI.stop();
				if (res.result /*&& res.page*/) {
					vm.list = res.result;
					vm.page = res.page;
				}
			});

		vm.onGo = function (index, name) {
			console.log('id=' + index + ' section=' + name);
			$state.go('main.private.dashboard.tasks.edit', {id: index, section: name});
		};

		vm.onClick = function (index) {
			console.log(index + ' !!!!');
			var paramsPOST = {};
			http.get('private/dashboard/' + vm.user.type + '/forms/' + index, paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.result && res.result.blank && res.result.blank.body &&	res.result.blank.body.sections && angular.isArray(res.result.blank.body.sections) && res.result.id ) {
						vm.model = (res.result.data && res.result.data.sections) ? res.result.data.sections : {};
						vm.sectionsName = [];
						res.result.blank.body.sections.forEach(function(item){
							vm.sectionsName.push(Object.keys(item)[0]);
						});

					}
				});
		};


	}
);

