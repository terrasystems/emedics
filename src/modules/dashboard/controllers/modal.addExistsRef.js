'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('modalAddExistsRefCtrl', function ($uibModalInstance, model, blockUI, alertService, http, localStorageService, $scope, $q,
												   DTO, $state, $translate) {
		var vm = this;
		vm.model = model;
		vm.user = localStorageService.get('userData');
		vm.users = [];
		vm.filterTitle = $translate.instant('Search and add reference');
		vm.placeholder = $translate.instant('SEARCH_REFS2');

		vm.onSelectCallback = function (item, model) {
			if (model === 'ADD') {
				$state.go('main.private.dashboard.abstract.references.editor');
				$uibModalInstance.close();
				return;
			}
			http.get('private/dashboard/' + vm.user.type + '/references/add/'+ model)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.getFindUsers = function (val) {
			vm.paramsPOST = DTO.default;
			vm.paramsPOST.criteria.search = val;
			vm.paramsPOST.criteria.list = [];
			return http.post('private/dashboard/' + vm.user.type + '/references/search', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if  (angular.isArray(res.result) && res.result.length===0) {
						res.result.push( { name: '... Create New', email: '', id: 'ADD' } );
					}
					vm.users = res.result;
					return res.result;
				});
		};

		vm.onBack = function() {
			$uibModalInstance.close();
		};

	})


	.controller('modalAddExistsPatCtrl', function ($uibModalInstance, model, blockUI, alertService, http, localStorageService, $scope, $q,
												   DTO, $state, $translate) {
		var vm = this;
		vm.model = model;
		vm.user = localStorageService.get('userData');
		vm.users = [];
		vm.filterTitle = $translate.instant('Search and add patients');
		vm.placeholder = $translate.instant('SEARCH_PATS');

		vm.onSelectCallback = function (item, model) {
			if (model === 'ADD') {
				$state.go('main.private.dashboard.abstract.patients.create');
				$uibModalInstance.close();
				return;
			}
			vm.paramsPOST = DTO.default;
			vm.paramsPOST.criteria.list = [];
			vm.paramsPOST.criteria.search = '';
			vm.paramsPOST.criteria.list.push({id: model, email: null, phone: null, name: null, history: []});
			http.post('private/dashboard/patients/add', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
				});
		};

		vm.getFindUsers = function (val) {
			vm.paramsPOST = DTO.default;
			vm.paramsPOST.criteria.search = val;
			return http.post('private/dashboard/patients/search', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if  (angular.isArray(res.result) && res.result.length===0) {
						res.result.push( { name: '... Create New', email: '', id: 'ADD' } );
					}
					vm.users = res.result;
					return res.result;
				});
		};

		vm.onBack = function() {
			$uibModalInstance.close();
		};

	});