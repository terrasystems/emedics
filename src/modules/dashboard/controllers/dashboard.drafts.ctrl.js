'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('draftsCtrl', function (localStorageService, pouchDB, $scope, $log) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.page = {};
		vm.list = [];

		vm.onClick = function (index) {
			$state.go('main.private.dashboard.abstract.tasks.edit', {id: index, type: 'tasks', patId: null});
		};

		var db = pouchDB('local');
		var doc = { name: 'David' };

		function error(err) {
			$log.error(err);
		}

		function get(res) {
			if (!res.ok) {
				return error(res);
			}
			return db.get(res.id);
		}

		function bind(res) {
			$scope.doc = res;
		}

		db.post(doc)
			.then(get)
			.then(bind)
			.catch(error);

	});