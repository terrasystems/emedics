'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('patientReferencesCtrl', function ($state, http, blockUI, $scope, localStorageService, initParamsPOST, alertService, $uibModal, $q) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.references = [];

		vm.onRemove = function (index, id) {
			http.get('private/dashboard/' + vm.user.type + '/references/remove/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
					vm.refresh();
				});
		};

		vm.onInvite = function (id, $event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.get('private/dashboard/' + vm.user.type + '/references/invite/' + id)
				.then(function (res) {
					blockUI.stop();
					if  (res.state) {
						alertService.add(0, res.state.message);
						vm.refresh();
					}
				});
		};

		vm.onAddRef = function () {
			var config = {
				templateUrl: 'modules/dashboard/views/modal.addExistsRef.html',
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
			var result = $uibModal.open(config);
			result.result.then(function (){});
		};

		vm.getFindMyRefs = function (val) {
			return http.post('private/dashboard/' + vm.user.type + '/references', {name: val, type: null})
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.references = res.result;
					}
					return res.result;
				});
		};

});


