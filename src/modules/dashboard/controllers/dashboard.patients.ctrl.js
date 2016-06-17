'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('patientsCtrl', function($scope, http, blockUI, initParamsPOST, $state, alertService, $uibModal, localStorageService){
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.searchref = '';
		vm.patients = [];
		vm.templates = [];

		vm.refresh = function () {
			http.get('private/dashboard/patients')
				.then(function (res) {
					blockUI.stop();
					if (res.result && angular.isArray(res.result) ) {
						vm.patients = res.result;
					}
				});
		};
		vm.refresh();

		vm.onCopyTask = function(taskObj, patientId) {
			var paramsPOST = {
				template: {
					id: taskObj.template.id,
					templateDto: {id : taskObj.template.id}
				},
				patient: patientId
			};
			http.post('private/dashboard/tasks/create', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.state && res.state.value && !!res.state.value) {
						var newTaskID = res.result.id;
						paramsPOST = {event:
						{	id: newTaskID,
							patient: taskObj.patient,
							template: taskObj.template,
							data: taskObj.data,
							fromUser: taskObj.fromUser,
							toUser: taskObj.toUser,
							descr: taskObj.descr
						}
						};
						http.post('private/dashboard/tasks/edit', paramsPOST)
							.then(function (res) {
								blockUI.stop();
								if (res.result) {
									alertService.add(0, res.state.message);
									newTaskID = res.result.id;
									$state.go('main.private.dashboard.abstract.patients.edit', {id: newTaskID, type: 'patients', patId: patientId});
								}
							});
					} else {
						alertService.add(2, res.state.message);
					}
				});
		};

		$scope.getFindPatients = function (val) {
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.search = val;
			return http.post('private/dashboard/patients/search', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if  (angular.isArray(res.result) && res.result.length>0) {
						res.result.map(function (item) {
							item.all = item.name + ', ' + item.email + ( (item.type == null) ? '' : ', ' + item.type);
							return item;
						});
					} else {
						res.result.push( { all: 'Add new reference...', id: 'add' } );
					}
					return res.result;
				});
		};

		$scope.onApply = function (obj) {
			if ($scope.doctor && $scope.doctor.id && $scope.doctor.id !==null && $scope.doctor.id !=='') {
				vm.paramsPOST = initParamsPOST.params;
				vm.paramsPOST.criteria.list = [];
				vm.paramsPOST.criteria.search = '';
				vm.paramsPOST.criteria.list.push({id: $scope.doctor.id, email: null, phone: null, name: null, history:[]});
				http.post('private/dashboard/patients/add', vm.paramsPOST)
					.then(function (res) {
						blockUI.stop();
						alertService.add(0, res.state.message);
						$scope.doctor = '';
						vm.refresh();
					});
			}
		};

		$scope.onSelect = function (item) {
			if  (item.id && item.id == 'add') {
				vm.addItemList();
			}
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
					vm.refresh();
				});
		};

		vm.onInvite = function (email, $event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.post('private/dashboard/patients/invite', email)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
					vm.refresh();
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

		vm.onView = function (histId, patientId) {
			$state.go('main.private.dashboard.abstract.patients.edit', {id: histId, type: 'patients+', patId: patientId});
		};

		vm.onSend = function (obj,hist) {
			var model = { templ_id: obj.id, obj: obj };

			blockUI.start();
			var result = $uibModal.open({
				templateUrl: 'modules/dashboard/views/modal.addNotif.html',
				controller: 'modalAddNotifCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function ($q) {
						var deferred = $q.defer();
						deferred.resolve({data: model,patient:{
							'name':hist.fromUser.username,
							'email':hist.fromUser.email,
							'id':hist.fromUser.id
						}});
						return deferred.promise;
					}
				}
			}).result;
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().replace(',', ' / ');
		};

	});
