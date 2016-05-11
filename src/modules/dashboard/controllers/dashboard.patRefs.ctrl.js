'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')
	.run(function(editableOptions) {
		editableOptions.theme = 'bs3';
	})

	.controller('patientReferencesCtrl', function ($state, http, blockUI,$scope) {
		console.log('..patientReferencesCtrl');

		var vm = this;

    vm.searchref='';
		var paramsPOST = {"page": {"start": 0,"count": 20},"criteria": {}};

		vm.references = [
			{id: '10', name: 'Klod', type: 'HOSPITAL', phone: '8 555 896-45-55', is_check: false},
			{id: '12', name: 'Klod', type: 'PHARMACY', phone: '8 500 596-45-56', is_check: false},
			{id: '13', name: 'Dod', type: 'HOMECARE', phone: '8 545 896-45-53', is_check: false},
			{id: '14', name: 'Slay', type: 'MD', phone: '8 544 896-45-51', is_check: false},
			{id: '15', name: 'Koddy', type: 'INSURANCE', phone: '8 566 896-45-50', is_check: false},
			{id: '17', name: 'Don K.', type: 'Doctor', phone: '8 555 896-45-55', is_check: false},
			{id: '18', name: 'Phil R.', type: 'Doctor', phone: '8 888 596-45-56', is_check: false},
			{id: '19', name: 'Dimon G.', type: 'Organization', phone: '8 777 896-45-53', is_check: false},
			{id: '20', name: 'Sool D.', type: 'Organization', phone: '8 111 896-45-51', is_check: false},
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
			//vm.inserted = {
			//	name:'',
			//	type: '',
			//	phone: ''
			//};
			//vm.references.unshift(vm.inserted);
			$state.go('main.private.dashboard.refadd');
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

		//Search

		$scope.$watch('doctor.selected', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				if (vm.doctors.indexOf(newVal) === -1) {
					vm.doctors.unshift(newVal);
				}
			}
		});

		vm.getDoctors = function(search) {
			vm.newDocs = vm.doctors.slice();
			if (search && vm.newDocs.indexOf(search) === -1) {
				vm.newDocs.unshift(search);
			}
			return vm.newDocs;
		};
		vm.doctors = [
			{
				"name": "Petya",
				'tel':89879879879,
				"city": "Khmelnitsky"
			},
			{
				"name": "Vitya",
				"tel": 1456364,
				"city": "Khmelnitsky"
			},
			{
				"name": "Andrew",
				"tel": 26576757,
				"city": "Khmelnitsky"
			},
			{
				"name": "Anton",
				"tel": 233,
				"city": "Khmelnitsky"
			},
			{
				"name": "Misha",
				"tel": 434435,
				"city": "Khmelnitsky"
			}
		].sort();
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


