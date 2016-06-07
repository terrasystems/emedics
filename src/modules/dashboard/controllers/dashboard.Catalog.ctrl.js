'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('CatalogCtrl', function (http, blockUI, alertService, $state) {
		var vm = this;
		vm.myForms = [];

		vm.onRefresh = function () {
			http.get('private/dashboard/user/template')
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						vm.myForms = res.result;
					}
				});
		};
		vm.onRefresh();

		vm.onRemove = function(id) {
			http.get('private/dashboard/template/delete/'+id)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
					vm.onRefresh();
				});

		};

		vm.onGoTemplates = function() {
			vm.arr = [];
			vm.myForms.forEach(function(e) {
				var item = {};
				item.id = e.templateDto.id;
				item.type = e.type;
				vm.arr.push(item);
			});
			$state.go('main.private.dashboard.abstract.catalog.catalogtemplate', { arr: vm.arr, onCheck: true });
		};

		vm.onAddTask = function(id_) {
			var paramsPOST = {template: {id: id_, templateDto: {id: null, body: {sections:[], name: ''}}}};
			http.post('private/dashboard/tasks/create', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if  (res.result) {
						alertService.add(0, res.state.message);
					}
				});
		};

	});