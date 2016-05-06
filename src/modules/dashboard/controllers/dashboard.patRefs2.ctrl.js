'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')
	.run(function(editableOptions) {
		editableOptions.theme = 'bs3';
	})

	.controller('patientReferences2Ctrl', function ($state, http, blockUI) {
		console.log('..patientReferences2Ctrl');

		var vm = this;

		var paramsPOST = {"page": {"start": 0,"count": 20},"criteria": {}};

		vm.references = [
			//{id: '10', name: 'Klod', type: 'Walkin0', phone: '8 555 896-45-55'},
			//{id: '12', name: 'Klod', type: 'Walkin1', phone: '8 500 596-45-56'},
			//{id: '13', name: 'Dod', type: 'Walkin2', phone: '8 545 896-45-53'},
			//{id: '14', name: 'Slay', type: 'Walkin3', phone: '8 544 896-45-51'},
			//{id: '15', name: 'Koddy', type: 'Walkin4', phone: '8 566 896-45-50'}
		];

		//get all items
		http.post('private/dashboard/references', paramsPOST)
			.then(function (res) {
				//console.log('get all..');
				blockUI.stop();
				if  (res.result) {
					vm.references = res.result;
				}
			});

		//delete item
		vm.remove = function(index, id) {
			//console.log('del ... index='+index+', id='+id);

			paramsPOST = {};
			http.get('private/dashboard/references/remove/' + id, paramsPOST)
				.then(function (res) {
					blockUI.stop();
					console.log(res);
					vm.references.splice(index, 1);
				});
		};

		vm.addFormList = function() {
			vm.inserted = {
				name:'',
				type: '',
				phone: ''
			};
			vm.references.unshift(vm.inserted);
		};

		//update or insert item
		vm.update_or_insert = function (obj, id) {
			//console.log('update_or_insert..'+id);

			paramsPOST = {}
			if (id && id !== '' && id !== null) {
				paramsPOST.id = id;
			}
			paramsPOST = obj;
			http.post('private/dashboard/references/edit', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					console.log(res);
				});
		};

////////////////
////
//		vm.model = {};
//		vm.option = {};
//		vm.fields = [
//			{
//				key: 'number',
//				type: 'input',
//				templateOptions: {
//					type: 'text',
//					label: 'Number',
//					placeholder: '№'
//				}
//			},
//			{
//				key: 'name',
//				type: 'input',
//				templateOptions: {
//					type: 'text',
//					label: 'Name',
//					placeholder: 'Enter name'
//				}
//			},
//			{
//				key: 'second_name',
//				type: 'input',
//				templateOptions: {
//					type: 'text',
//					label: 'Second name',
//					placeholder: 'Enter second name'
//				}
//			},
//			{
//				key: 'allergies',
//				type: 'textarea',
//				templateOptions: {
//					label: 'Allergies to medicines',
//					placeholder: 'Allergies to medicines',
//					description: ''
//				}
//			},
//			{
//				key: 'hiv_positive',
//				type: 'checkbox',
//				templateOptions: { label: 'HIV positive' }
//			}
//		];

	}
);


