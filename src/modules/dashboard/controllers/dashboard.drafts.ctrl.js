'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('draftsCtrl', function ($scope, pouchDB, $rootScope, $state, pouch_db, confirmService, alertService,
										http, blockUI, localStorageService, $q, $uibModal) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.list = [];
		var base_db = $rootScope.db;

		vm.onEdit = function (id) {
			$state.go('main.private.dashboard.abstract.drafts.edit', {id: id});
		};

		vm.onSend = function (obj) {

			var paramsPOST = {
				template: {
					id: obj.doc.body.formInfo.rawData.template.id,
					templateDto: null
				},
				//patient: (obj.doc.body.formInfo.rawData.patient === null)? null :  obj.doc.body.formInfo.rawData.patient.id,
				patient: obj.doc.body.formInfo.rawData.patient ? obj.doc.body.formInfo.rawData.patient.id : null,
				data: "{}"
			};
			http.post('private/dashboard/tasks/create', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.state && res.state.value && !!res.state.value) {
						var newTaskID = res.result.id;
						paramsPOST = {event:
						{	id: newTaskID,
							patient: res.result.patient,
							template: res.result.template,
							data: {sections: obj.doc.body.sections},
							fromUser: res.result.fromUser,
							toUser: null,
							descr: res.result.descr
						}
						};
						http.post('private/dashboard/tasks/edit', paramsPOST)
							.then(function (res) {
								blockUI.stop();
								if (res.result) {

									var config = {
										templateUrl: 'modules/dashboard/views/modal.addNotif.html',
										controller: 'modalAddNotifCtrl',
										controllerAs: 'vm',
										resolve: {
											model: function($q) {
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
					} else {
						alertService.add(2, res.state.message);
					}
				});
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
			return d.slice(0, 19).replace('T', ' / ');
		};

	});