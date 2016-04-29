'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksEditCtrl', function ($rootScope, $state, $http, constants, $stateParams) {
		console.log('..patientTasksEditCtrl');
		var vm = this;
		vm.onSubmit = onSubmit;

		vm.sexes = [{label: 'Male'}, {label: 'Female'}];

		//vm.sexes = ('Male'+
		//'Female'
		//).split(' ').map(function(sex) {
		//		return {label: sex};
		//	});

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
						{name: 'Man', value: '1'},
						{name: 'Woman', value: '0'},
						{name: 'n/a', value: '-1'}
					]
				}
			}
		];

		function onSubmit() {
			vm.options.updateInitialValue();
			alert(JSON.stringify(vm.model), null, 2);
		}

	});