'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('patientsCtrl', function($scope, http, blockUI, initParamsPOST, $state, alertService, $uibModal){
		var vm = this;
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

		vm.onEdit = function(formID, patientId) {
			$state.go('main.private.dashboard.abstract.patients.edit', {id: formID, type: 'patients', patId: patientId});
		};

		$scope.getFindPatients = function (val) {
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.search = val;
			return http.post('private/dashboard/docpatients/search', vm.paramsPOST)
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
				http.post('private/dashboard/docpatients/add', vm.paramsPOST)
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
			http.post('private/dashboard/docpatients/remove', vm.paramsPOST)
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
			http.post('private/dashboard/docpatients/invite', email)
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

		vm.onSend = function (obj) {
			var model = { templ_id: obj.id, obj: obj };
			blockUI.start();
			var result = $uibModal.open({
				templateUrl: 'modules/dashboard/views/modal.addNotif.html',
				controller: 'modalAddNotifCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function ($q) {
						var deferred = $q.defer();
						deferred.resolve({data: model});
						return deferred.promise;
					}
				}
			}).result;
		};

		vm.convertDate = function (d) {
			var x = new Date(d);
			return x.toISOString().slice(0,19).replace('', ' ');
		};

	});
