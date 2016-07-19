'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('patientsCtrl', function($scope, http, blockUI, initParamsPOST, $state, alertService, $uibModal, localStorageService, $q,$stateParams, DTO){
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.patients = [];
		vm.templates = [];
		vm.temp_ = '';

		//vm.onCopyTask = function(taskObj, patientId) {
		//	var paramsPOST = {
		//		template: {
		//			id: taskObj.template.id,
		//			templateDto: {id : taskObj.template.id}
		//		},
		//		patient: patientId,
		//		data: "{}"
		//	};
		//	http.post('private/dashboard/tasks/create', paramsPOST)
		//		.then(function (res) {
		//			blockUI.stop();
		//			if (res.state && res.state.value && !!res.state.value) {
		//				var newTaskID = res.result.id;
		//				paramsPOST = {event:
		//				{	id: newTaskID,
		//					patient: taskObj.patient,
		//					template: taskObj.template,
		//					data: taskObj.data,
		//					fromUser: taskObj.fromUser,
		//					toUser: taskObj.toUser,
		//					descr: taskObj.descr
		//				}
		//				};
		//				http.post('private/dashboard/tasks/edit', paramsPOST)
		//					.then(function (res) {
		//						blockUI.stop();
		//						if (res.result) {
		//							alertService.add(0, res.state.message);
		//							newTaskID = res.result.id;
		//							$state.go('main.private.dashboard.abstract.patients.edit', {id: newTaskID, type: 'patients', patId: patientId});
		//						}
		//					});
		//			} else {
		//				alertService.add(2, res.state.message);
		//			}
		//		});
		//};
        //
		//vm.onEditTask = function(histId, patientId) {
		//	$state.go('main.private.dashboard.abstract.patients.edit', {id: histId, type: 'patients', patId: patientId});
		//};

		vm.getFindPatients = function (val) {
			var paramPOST = DTO.filters;
			paramPOST.name = val;
			return http.post('private/dashboard/patients', paramPOST /*{name: val}*/)
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.patients = res.result;
					}
					return res.result;
				});
		};
		vm.getFindPatients('');

		vm.onAddPateint = function () {
			var config = {
				templateUrl: 'modules/dashboard/views/modal.addExistsRef.html',
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
				vm.getFindPatients(vm.temp_);
			});
		};

		vm.addItemList = function () {
			$state.go('main.private.dashboard.abstract.patients.create');
		};

		vm.onRemove = function (id_,$event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.list = [];
			vm.paramsPOST.criteria.list.push({id: id_});
			http.post('private/dashboard/patients/remove', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
					vm.getFindPatients(vm.temp_);
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
						vm.getFindPatients(vm.temp_);
					}
				});
		};

		vm.onOpenPatient = function (id) {
			vm.templates = [];
			http.get('private/dashboard/patients/' + id + '/events')
				.then(function (res) {
					blockUI.stop();
					if (res.result && angular.isArray(res.result) ) {
						vm.templates = res.result;
					}
				});
		};

		vm.onOpenPatientSS = function (id_, name_, email_, phone_) {
			$state.go('main.private.dashboard.abstract.patients.templates', {id: id_, name: name_, email: email_, phone: phone_});
		};

	});
