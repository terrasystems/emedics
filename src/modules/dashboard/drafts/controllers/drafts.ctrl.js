'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('draftsCtrl', function ($scope, pouchDB, $rootScope, $state, pouch_db, confirmService, alertService,
										http, blockUI, localStorageService, $q, $uibModal, DTO) {
		var vm = this;
		vm.user = localStorageService.get('user');
		vm.list = [];
		var base_db = $rootScope.db;

		vm.onEdit = function (id) {
			$state.go('main.dashboard.drafts.edit', {id: id});
		};

		vm.onSend = function (obj) {
			var paramsCreate = DTO.createTask;
			paramsCreate.template.id = obj.doc.body.formInfo.rawData.template.id;
			paramsCreate.patient = obj.doc.body.formInfo.rawData.patient ? obj.doc.body.formInfo.rawData.patient.id : null;
			paramsCreate.data = JSON.stringify({sections: obj.doc.body.sections});
			//var paramsCreate = {
			//	template: {
			//		id: obj.doc.body.formInfo.rawData.template.id,
			//		templateDto: null
			//	},
			//	patient: obj.doc.body.formInfo.rawData.patient ? obj.doc.body.formInfo.rawData.patient.id : null,
			//	fromID: null, //vm.user.id,
			//	data: JSON.stringify({sections: obj.doc.body.sections})   // !!!!!
			//};
			if (vm.user.type === 'stuff' ||
				vm.user.type === 'patient' ||
				(vm.user.type === 'doctor' && obj.doc.body.formInfo.rawData.template.typeEnum === 'MEDICAL')) {
				http.get('private/dashboard/tasks/findTask/'+obj.doc.body.formInfo.rawData.template.id)
					.then(function (res) {
						if  (res.result) {
							//edit promis
							var newTaskID = res.result.id;
							var paramsEdit = DTO.editTask;
							paramsEdit.event.id = newTaskID;
							paramsEdit.event.patient = res.result.patient;
							paramsEdit.event.template = res.result.template;
							paramsEdit.event.data.sections = obj.doc.body.sections;
							paramsEdit.event.fromUser = res.result.fromUser;
							paramsEdit.event.descr = res.result.descr;
							//var paramsEdit = { event:
							//	{	id: newTaskID,
							//		patient: res.result.patient,
							//		template: res.result.template,
							//		data: {sections: obj.doc.body.sections}, // !!!!!
							//		fromUser: res.result.fromUser,
							//		toUser: null,
							//		descr: res.result.descr
							//	}
							//};
							http.post('private/dashboard/tasks/edit', paramsEdit)
								.then(function (res) {
									blockUI.stop();
									//modal window
									if (res.state && res.state.value && !!res.state.value) {
										var config = {
											templateUrl: 'modules/dashboard/views/modal.addNotif.html',
											controller: 'modalAddNotifCtrl',
											controllerAs: 'vm',
											resolve: {
												model: function ($q) {
													var deferred = $q.defer();
													deferred.resolve({
														data: {
															task_id: newTaskID,
															obj: obj.doc.body.formInfo
														}
													});
													return deferred.promise;
												}
											}
										};
										var result = $uibModal.open(config);
										result.result.then(function () {
											vm.onRefresh();
										});
									}
								});
						} else {
							//create promis with model
							http.post('private/dashboard/tasks/create', paramsCreate)
								.then(function (res) {
									blockUI.stop();
									if (res.state && res.state.value && !!res.state.value) {
										var newTaskID = res.result.id;
										//modal window
										var config = {
											templateUrl: 'modules/dashboard/views/modal.addNotif.html',
											controller: 'modalAddNotifCtrl',
											controllerAs: 'vm',
											resolve: {
												model: function ($q) {
													var deferred = $q.defer();
													deferred.resolve({
														data: {
															task_id: newTaskID,
															obj: obj.doc.body.formInfo
														}
													});
													return deferred.promise;
												}
											}
										};
										var result = $uibModal.open(config);
										result.result.then(function () {
											vm.onRefresh();
										});
									}
								});
						}
					});
			} else {
				//create with model
				http.post('private/dashboard/tasks/create', paramsCreate)
					.then(function (res) {
						blockUI.stop();
						if (res.state && res.state.value && !!res.state.value) {
							var newTaskID = res.result.id;
							//modal window
							var config = {
								templateUrl: 'modules/dashboard/views/modal.addNotif.html',
								controller: 'modalAddNotifCtrl',
								controllerAs: 'vm',
								resolve: {
									model: function ($q) {
										var deferred = $q.defer();
										deferred.resolve({data: {task_id: newTaskID, obj: obj.doc.body.formInfo}});
										return deferred.promise;
									}
								}
							};
							var result = $uibModal.open(config);
							result.result.then(function () {
								vm.onRefresh();
							});
						}
					});
			}
		};

		vm.onDelete = function(id) {
			confirmService('Delete draft?')
				.then(function(res) {
					pouch_db.del(base_db, id)
						.then(function() {
							vm.onRefresh();
						});
					});
		};

		vm.onRefresh = function () {
			pouch_db.load_all(base_db, $scope)
				.then(function(res) {
					vm.list = res;
				});
		};
		vm.onRefresh();

		vm.convertDateTime = function (d) {
			var y = new Date(d);
			return y.toLocaleString().replace(',', ' / ');
		};

	});