'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksEditCtrl', function ($rootScope, http, constants, $stateParams, $state, localStorageService) {
		//console.log('..patientTasksEditCtrl');
		var vm = this;
		vm.id = $stateParams.id;
		vm.user = localStorageService.get('userData');

		console.log(vm.id);
		vm.onSubmit = onSubmit;

		vm.model = {FullName: '', number: '', date1: null, sex: '-1'};
		vm.option = {};
		vm.fields = [
			{
				key: 'number',
				type: 'input',
				templateOptions: {
					type: 'text',
					label: 'number',
					placeholder: '№'
				}
			},
			{
				key: 'FullName',
				type: 'input',
				templateOptions: {
					type: 'text',
					label: 'Full name',
					placeholder: 'Enter Full name'
				}
			},
			{
				key: 'date1',
				type: 'datepicker',
				templateOptions: {
					label: 'Date 1',
					type: 'text',
					datepickerPopup: 'dd-MMMM-yyyy'
				}
			},
			{
				key: 'sex',
				type: 'select',
				templateOptions: {
					label: 'Sex',
					options: [
						{name: 'Male', value: '1'},
						{name: 'Female', value: '0'},
						{name: 'n/a', value: '-1'}
					]
				}
			}
		];

		var paramsPOST = {};

		http.post('private/dashboard/'+vm.user.type+'/getform/'+vm.id, paramsPOST)
			.then(function (res) {
				blockUI.stop();
				if  (res.form && res.blank) {
					vm.fields = res.form;
					vm.model = res.blank;
				}
			});

		function onSubmit() {
			vm.options.updateInitialValue();
			alert(JSON.stringify(vm.model), null, 2);
			paramsPOST = {};
			paramsPOST.id = vm.id;
			paramsPOST.data = vm.model;

			http.post('private/dashboard/'+vm.user.type+'/forms/edit', paramsPOST)
				.then(function (res) {
					blockUI.stop();
				});
		}

	});