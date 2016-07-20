'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('referencesCtrl', function ($state, http, blockUI, localStorageService, alertService, $uibModal, $q, DTO) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.references = [];
		vm.temp_ = '';

		vm.onRemove = function (id, $event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.get('private/dashboard/' + vm.user.type + '/references/remove/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
					vm.getFindMyRefs(vm.temp_);
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
						vm.getFindMyRefs(vm.temp_);
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
			result.result.then(function (){
				vm.getFindMyRefs(vm.temp_);
			});
		};

		vm.getFindMyRefs = function (val) {
			var paramPOST = DTO.criteriaDTO();
			paramPOST.search = val;
			return http.post('/references/all',  paramPOST)
				.then(function (res) {
					blockUI.stop();
/*					if (angular.isArray(res.result)) {
						res.result.map(function(item) {
							if  (item.orgType !==null) {
								item.type = item.docType + ' ' + item.orgType;
							} else {
								if (item.docType!==null) {
									item.type = item.userType + ' ' + item.docType;
								} else {
									item.type = item.userType;
								}
							}
							return item;
						});
						vm.references = res.result;
					}*/
					return res.result;
				});
		};
		vm.getFindMyRefs('');

		vm.onRefInfo = function(ref) {
			$state.go('main.private.dashboard.abstract.references.info', {ref: ref});
		};
});


