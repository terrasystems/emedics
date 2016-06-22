'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('draftsCtrl', function ($scope,localStorageService, pouchDB, $rootScope) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.page = {};
		vm.list = [];

		vm.onClick = function (index) {
			$state.go('main.private.dashboard.abstract.tasks.edit', {id: index, type: 'tasks', patId: null});
		};

		var base1 = $rootScope.db;


		base1.allDocs({include_docs: true}).then(function(result){
			console.log(result.rows);
		});

		base1.allDocs({include_docs: true, descending: true}, function(err, doc) {
			$scope.$apply(function(){
				vm.list = doc;
				console.log(vm.list);
			});
		});

	});