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

		vm.onSelectCallback = function (item, id) {
			if ('ADD' === id) {
				$state.go('main.private.dashboard.references.editor');
				$uibModalInstance.close();
				return;
			}
			http.get('/references/add/'+ id)
				.then(function (res) {
					blockUI.stop();
					return res.state.message;
					//alertService.add(0, res.state.message);
				});
		};

		vm.getFindUsers = function (val) {
			vm.criteriaDTO = DTO.criteriaDTO();
			vm.criteriaDTO.search = val;
			return http.post('/references/all', vm.criteriaDTO)
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

		vm.onSelectCallback = function (item, id) {
			if (model === 'ADD') {
				$state.go('main.private.dashboard.patients.create');
				$uibModalInstance.close();
				return;
			}
			http.get('/references/add/'+ id)  // !!!!!references
				.then(function (res) {
					blockUI.stop();
					alertService.success(res.state.message);
				});
		};

		vm.getUsers = function (val) {
			var criteriaDTO = DTO.criteriaDTO();
			criteriaDTO.search = val;
			return http.post('/patients/all', criteriaDTO)
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