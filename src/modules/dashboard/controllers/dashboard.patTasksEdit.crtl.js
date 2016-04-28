'use strict';


angular.module('modules.dash')


	.controller('patientTasksEditCtrl', function($rootScope, $state, $http, constants, $stateParams) {
		console.log('..patientTasksEditCtrl');



		var vm = this;
		vm.myDate = new Date();
		vm.minDate = new Date(
			vm.myDate.getFullYear(),
			vm.myDate.getMonth() - 2,
			vm.myDate.getDate());
		vm.maxDate = new Date(
			vm.myDate.getFullYear(),
			vm.myDate.getMonth() + 2,
			vm.myDate.getDate());
		vm.onlyWeekendsPredicate = function(date) {
			var day = date.getDay();
			return day === 0 || day === 6;
		};


vm.sexes=[{
	label:'Male'

},{label:'Female'}];

		//vm.sexes = ('Male'+
		//'Female'
		//).split(' ').map(function(sex) {
		//		return {label: sex};
		//	});
		//
		//




		vm.users = {FullName:'',number:''};
		vm.option = {};
		vm.userField = [
			{
				className: 'col-md-12',
				key: 'number',
				type: 'input',
				templateOptions: {
					type: 'text',
					label: 'number',
					placeholder: '№'

				}
			},
			{
				className: 'col-md-12',
				key: 'FullName',
				type: 'input',
				templateOptions: {
					type: 'text',
					label: 'Full name',
					placeholder: 'Enter Full name'

				}
			}



		];


});