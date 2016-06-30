'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('draftsCtrl', function ($scope, pouchDB, $rootScope, $state, pouch_db, confirmService, alertService) {
		var vm = this;
		vm.list = [];
		var base_db = $rootScope.db;

		vm.onEdit = function (id) {
			//$state.go('main.private.dashboard.abstract.tasks.edit', {id: index, type: 'tasks', patId: null});
		};

		vm.onSend = function (id) {
			//
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