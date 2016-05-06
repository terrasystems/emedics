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

		vm.onSubmit = onSubmit;

		//vm.model = {};
		//vm.option = {};
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
				if (res.result && res.result.blank && res.result.id && res.result.data) {
					vm.fields = res.result.blank.body;
					vm.model = res.result.data ? res.result.data : {};

					var mkey = Object.keys(vm.model);
					if  (mkey.length>0) {
						for (var i = 0; i < mkey.length; i++) {
							if (mkey[i].indexOf('date_') >= 0) {
								var s = vm.model[mkey[i]];
								vm.model[mkey[i]] = new Date(s);
							}
						}
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