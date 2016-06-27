'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('draftsCtrl', function ($scope, pouchDB, $rootScope, $state) {
		var vm = this;
		vm.list = [];

		vm.onClick = function (obj) {
			//$state.go('main.private.dashboard.abstract.tasks.edit', {id: index, type: 'tasks', patId: null});
		};

		var base1 = $rootScope.db;

		base1.allDocs({include_docs: true, descending: true}, function(err, doc) {
			$scope.$apply(function(){
				vm.list = doc;
			});
		});

		vm.convertDateTime = function (d) {
			return d.slice(0, 19).replace('T', ' / ');
		};

	});