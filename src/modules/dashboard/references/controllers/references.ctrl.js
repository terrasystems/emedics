'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('referencesCtrl', function ($state, http, blockUI, localStorageService, alertService, $uibModal, $q, DTO) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.references = [];
		vm.search = '';

		vm.onRemove = function (id, $event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.get('/references/remove/'+id)
				.then(function () {
					blockUI.stop();
					vm.getReferences(vm.search);
				});
		};

		vm.onInvite = function (id, $event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.get('/references/invite/' + id)
				.then(function (res) {
					blockUI.stop();
					if  (res.state) {
						vm.getReferences(vm.search);
					}
				});
		};

		vm.onAddRef = function () {
			var config = {
				templateUrl: 'modules/modal/views/modal.addExistsRef.html',
				controller: 'modalAddExistsRefCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function($q) {
						var deferred = $q.defer();
						deferred.resolve({});
						return deferred.promise;
					}
				}
			};
			var modal = $uibModal.open(config);
			modal.result.then(function (){
				vm.getReferences(vm.search);
			});
		};

		vm.getReferences = function (val) {
			var criteriaDTO = DTO.criteriaDTO();
			criteriaDTO.search = val;
			return http.post('/references/all',  criteriaDTO)
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.references = res.result;
					}
					return res.result;
				});
		};
		vm.getReferences('');

		vm.onRefInfo = function(ref) {
			$state.go('main.private.dashboard.references.info', {ref: ref});
		};
});


