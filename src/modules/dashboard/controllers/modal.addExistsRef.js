'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('modalAddExistsRefCtrl', function ($uibModalInstance, model, blockUI, alertService, http, localStorageService, $scope, $q,
												   initParamsPOST, $state) {
		var vm = this;
		vm.model = model;
		vm.user = localStorageService.get('userData');
		vm.refs = [];

		vm.onSelectCallback = function (item, model) {
			if (model === 'ADD') {
				$state.go('main.private.dashboard.abstract.refadd');
				$uibModalInstance.close();
				return;
			}
			http.get('private/dashboard/' + vm.user.type + '/references/add/'+ model)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.getFindRefs = function (val) {
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.search = val;
			return http.post('private/dashboard/' + vm.user.type + '/references/search', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if  (angular.isArray(res.result) && res.result.length===0) {
						res.result.push( { name: '... Create New', email: '', id: 'ADD' } );
					}
					vm.refs = res.result;
					return res.result;
				});
		};

		vm.onBack = function() {
			$uibModalInstance.close();
		};

	});