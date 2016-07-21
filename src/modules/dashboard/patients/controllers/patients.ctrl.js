'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')
	.controller('patientsCtrl', function(http, blockUI, $state, alertService, $uibModal, $q, DTO){
		var vm = this;
		vm.patients = [];
		vm.search = '';

		vm.getPatients = function (val) {
			var criteriaDTO = DTO.criteriaDTO();
			criteriaDTO.search = val;
			return http.post('/patients/all', criteriaDTO)
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.patients = res.result;
					}
					return res.result;
				});
		};
		vm.getPatients('');

		vm.onAddPateint = function () {
			var config = {
				templateUrl: 'modules/modal/views/modal.addExistsRef.html',
				controller: 'modalAddExistsPatCtrl',
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
				vm.getPatients(vm.search);
			});
		};

		vm.onRemove = function (id_,$event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.get('/patients/remove/'+id_)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
					vm.getPatients(vm.temp_);
				});
		};

		vm.onInvite = function (id, $event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.get('/patients/invite/' + id)
				.then(function (res) {
					blockUI.stop();
					if  (res.state) {
						alertService.success(res.msg);
						vm.getPatients(vm.temp_);
					}
				});
		};

		vm.onOpenPatientsTemplates = function (id_, name_, email_, phone_) {
			$state.go('main.private.dashboard.abstract.patients.templates', {id: id_, name: name_, email: email_, phone: phone_});
		};

	});