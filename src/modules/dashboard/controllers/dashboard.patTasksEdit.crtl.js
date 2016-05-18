'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientTasksEditCtrl', function ($rootScope, http, constants, $stateParams, $state, localStorageService, blockUI, $scope) {
		if  (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go('main.private.dashboard.tasks');
			return;
		}

		var vm = this;
		vm.id = $stateParams.id;
		vm.user = localStorageService.get('userData');
		vm.sections = [];
		vm.options = [];
		vm.model = [];
		vm.sectionsName = [];
		vm.selectedSection = '';
		vm.selectedKey = '';

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

					vm.model = (res.result.data && res.result.data.sections) ? res.result.data.sections : undefined;
					vm.formInfo = {};
					vm.formInfo.category = res.result.blank.category;
					vm.formInfo.name = res.result.blank.name;
					vm.formInfo.number = res.result.blank.number;
					vm.formInfo.descr = res.result.blank.descr;

					vm.sectionsName = [];
					res.result.blank.body.sections.forEach(function(item){
						vm.sectionsName.push(Object.keys(item)[0]);
					});
					if  (! vm.model) {
						vm.model = [];
						vm.sectionsName.forEach(function(item){
							var it = {};
							it[item] = {};
							vm.model.push(it);
						});
					}
					vm.selectedSection = vm.sectionsName[0];
					if  (vm.sectionsName.length>0) {
						vm.sections = res.result.blank.body.sections;

						for (var key in  vm.model) {
							var obj = vm.model[key][Object.keys(vm.model[key])[0]];
							for (var prop in obj) {
								if (obj.hasOwnProperty(prop) && prop.indexOf('date_')=== 0) { obj[prop] = new Date(obj[prop]); }
							}
						}
					}

					$scope.$watch('vm.selectedSection', function(newValue) {
						console.log('newValue: '+newValue);

						for (var key in vm.model) {
							if  (newValue == Object.keys(vm.model[key])[0])
							{ vm.selectedKey = key; }
							//var obj = vm.model[key][Object.keys(vm.model[key])[0]];
						}

					});

				}
			});

		function onSubmit() {
			//vm.options.updateInitialValue();
			//alert(JSON.stringify(vm.model), null, 2);
			paramsPOST = {};
			paramsPOST.id = vm.id;
			paramsPOST.data = {};
			paramsPOST.data.sections = vm.model;
			paramsPOST.blank = null;

			http.post('private/dashboard/' + vm.user.type + '/forms/edit', paramsPOST)
				.then(function (res) {
					blockUI.stop();
				});
		}

	});