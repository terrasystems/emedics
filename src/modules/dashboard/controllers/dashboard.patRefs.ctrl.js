'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')
	.run(function(editableOptions) {
		editableOptions.theme = 'bs3';
	})

	.controller('patientReferencesCtrl', function ($state, http, blockUI) {
		console.log('..patientReferencesCtrl');

		var vm = this;

		var paramsPOST = {"page": {"start": 0,"count": 20},"criteria": {}};

		vm.references = [{id: '10', name: 'Klod', type: 'Walkin0', phone: '8 555 896-45-55'},
			{id: '12', name: 'Klod', type: 'Walkin1', phone: '8 500 596-45-56'},
			{id: '13', name: 'Dod', type: 'Walkin2', phone: '8 545 896-45-53'},
			{id: '14', name: 'Slay', type: 'Walkin3', phone: '8 544 896-45-51'},
			{id: '15', name: 'Koddy', type: 'Walkin4', phone: '8 566 896-45-50'}];

		//get all items
		http.post('private/dashboard/references', paramsPOST)
			.then(function (res) {
				console.log('get all..');
				blockUI.stop();
				if  (res.object) {
					vm.references = res.object;
				}
			});

		//delete item
		vm.remove = function(index, id) {
			vm.references.splice(index, 1);
			console.log('del ... index='+index+', id='+id);
			paramsPOST = {};
			http.get('private/dashboard/references/remove/' + id, paramsPOST)
				.then(function (res) {
					blockUI.stop();
					console.log(res);
				});
		};

		vm.addFormList = function() {
			vm.inserted = {
				name:'',
				type: '',
				phone: ''
			};
			vm.references.push(vm.inserted);
		};

		//update or insert item
		vm.update_or_insert = function (id, obj) {
			console.log('update_or_insert..'+id);
			paramsPOST = {}
			if (id && id !== '' && id !== null) {
				paramsPOST.id = id;
			}
			paramsPOST.data = obj;
			http.post('private/dashboard/references/edit', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					console.log(res);
				});
		};


	}
);


