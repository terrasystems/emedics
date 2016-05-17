'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksEditCtrl', function ($rootScope, http, constants, $stateParams, $state, localStorageService, blockUI) {
		if  (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go('main.private.dashboard.tasks');
			return;
		}

		var vm = this;
		vm.id = $stateParams.id;
		vm.user = localStorageService.get('userData');
		vm.sections = [];
		vm.options = [];
		vm.sectionsName = [];

		vm.onSubmit = onSubmit;

		//vm.fields = [
		//	{
		//		key: 'number',
		//		type: 'input',
		//		templateOptions: {
		//			type: 'text',
		//			label: 'Number',
		//			placeholder: '№'
		//		}
		//	},
		//	{
		//		key: 'full_name',
		//		type: 'input',
		//		templateOptions: {
		//			type: 'text',
		//			label: 'Full name',
		//			placeholder: 'Enter Full name'
		//		}
		//	},
		//	{
		//		key: 'date_birth',
		//		type: 'datepicker',
		//		templateOptions: {
		//			label: 'Date birth',
		//			type: 'text',
		//			datepickerPopup: 'yyyy-MMMM-dd'
		//		}
		//	},
		//	{
		//		key: 'sex',
		//		type: 'select',
		//		templateOptions: {
		//			label: 'Sex',
		//			options: [
		//				{name: 'Male', value: '1'},
		//				{name: 'Female', value: '0'},
		//				{name: 'n/a', value: '-1'}
		//			]
		//		}
		//	}
		//];

		var paramsPOST = {};

		http.get('private/dashboard/' + vm.user.type + '/forms/' + vm.id, paramsPOST)
			.then(function (res) {
				blockUI.stop();
				if (res.result && res.result.blank && res.result.blank.body &&	res.result.blank.body.sections && angular.isArray(res.result.blank.body.sections) && res.result.id ) {
					vm.model = (res.result.data && res.result.data.sections) ? res.result.data : {};
					vm.sectionsName = [];
					res.result.blank.body.sections.forEach(function(item){
						vm.sectionsName.push(Object.keys(item)[0]);
					});
					//vm.sectionsName = Object.keys(res.result.blank.body.sections);
					if  (vm.sectionsName.length>0) {
						vm.sections = res.result.blank.body.sections;

						//var mkey = Object.keys(vm.model);
						//if  (mkey.length>0) {
						//	for (var i = 0; i < mkey.length; i++) {
						//		if (mkey[i].indexOf('date_') >= 0) {
						//			var s = vm.model[mkey[i]];
						//			vm.model[mkey[i]] = new Date(s);
						//		}
						//	}
						//}
					}
				}
			});

		function onSubmit() {
			vm.options.updateInitialValue();
			//alert(JSON.stringify(vm.model), null, 2);
			paramsPOST = {};
			paramsPOST.id = vm.id;
			paramsPOST.data = vm.model;
			paramsPOST.blank = null;

			http.post('private/dashboard/'+vm.user.type+'/forms/edit', paramsPOST)
				.then(function (res) {
					blockUI.stop();
				});
		}

	});