'use strict';
/*jshint -W117, -W097, -W116, -W089*/

angular.module('modules.dash')

	.controller('patientTasksEditCtrl', function (http, $q, $stateParams, $state, localStorageService, blockUI, $scope, alertService, $timeout, $translate) {
		//console.log('Type: ' + $stateParams.type + ' id: ' + $stateParams.id + ' patId: ' + $stateParams.patId);
		if (!$stateParams.type || $stateParams.type === '' || $stateParams.type === null) {
			$state.go('main.private.dashboard.abstract.tasks');
			return;
		}

		var vm = this;

		if ($stateParams.type == 'tasks') {
			vm.mainState = 'main.private.dashboard.abstract.tasks';
		} else {
			vm.mainState = 'main.private.dashboard.abstract.patients';
		}
     vm.hideButton = $stateParams.type;
		if (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go(vm.mainState);
			return;
		} else {
			vm.id = $stateParams.id;
		}

		vm.user = localStorageService.get('userData');
		if ($stateParams.type == 'tasks') {
			vm.getUrl = 'private/dashboard/' + vm.user.type + '/forms/' + vm.id;
			vm.setUrl = 'private/dashboard/' + vm.user.type + '/forms/edit';
		} else {
			vm.getUrl = 'private/dashboard/docpatients/forms/'+vm.id;
			vm.setUrl = 'private/dashboard/docpatients/edit';
		}

		vm.sections = [];
		vm.options = [];
		vm.model = [];
		vm.sectionsName = [];
		vm.selectedSection = '';
		vm.selectedKey = '';

		vm.onSubmit = onSubmit;

		var paramsPOST = {};

		http.get(vm.getUrl, paramsPOST)
			.then(function (res) {
				blockUI.stop();

				if ($stateParams.type == 'tasks') {
					vm.checkArr = (res.result && res.result.blank && res.result.blank.body && res.result.blank.body.sections && angular.isArray(res.result.blank.body.sections) && res.result.id);
				} else {
					vm.checkArr = (res.result && res.result.form && res.result.form.blank && res.result.form.blank.body && res.result.form.blank.body.sections && angular.isArray(res.result.form.blank.body.sections) && res.result.form.id);
				}

				if (vm.checkArr) {
					vm.model = (res.result.data && res.result.data.sections) ? res.result.data.sections : undefined;
					vm.formInfo = {};
					vm.formInfo.id = ($stateParams.type == 'tasks') ?  res.result.id : res.result.form.id;
					vm.formInfo.category = ($stateParams.type == 'tasks') ? res.result.blank.category : res.result.form.blank.category;
					vm.formInfo.name =($stateParams.type == 'tasks') ? res.result.blank.name : res.result.form.blank.name;
					vm.formInfo.number = ($stateParams.type == 'tasks') ? res.result.blank.number : res.result.form.blank.number;
					vm.formInfo.descr = ($stateParams.type == 'tasks') ? res.result.blank.descr : res.result.form.blank.descr;

					vm.sectionsName = [];
					if ($stateParams.type == 'tasks') {
						res.result.blank.body.sections.forEach(function (item) {
							vm.sectionsName.push(Object.keys(item)[0]);
						});
					} else {
						res.result.form.blank.body.sections.forEach(function (item) {
							vm.sectionsName.push(Object.keys(item)[0]);
						});
					}

					if (!vm.model) {
						vm.model = [];
						vm.sectionsName.forEach(function (item) {
							var it = {};
							it[item] = {};
							vm.model.push(it);
						});
					}
					vm.selectedSection = vm.sectionsName[0];
					if (vm.sectionsName.length > 0) {
						vm.sections = ($stateParams.type == 'tasks') ? res.result.blank.body.sections : res.result.form.blank.body.sections;
						//*******

						vm.sections_ = [
							{
								sectionA: [
									{
										template: '<div><H4><span translate="F1_SAA"></span></H4></div>'
									},
									{
										template: '<hr /><div><strong> 1.</strong></div>',
										className: 'fieldgroup'
									},
									{
										key: 'F1_SAA_1DATE',
										className: 'field',
										type: 'datepicker',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SAA_1DATE'),
											datepickerPopup: 'yyyy-MMMM-dd'
										}
									},
									{
										key: 'F1_SAA_1CLIENT',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SAA_1CLIENT'),
											placeholder: $translate.instant('F1_SAA_1CLIENT')
										}
									},
									{
										key: 'F1_SAA_1FUNCTION',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SAA_1FUNCTION'),
											placeholder: $translate.instant('F1_SAA_1FUNCTION')
										}
									},
									{
										key: 'F1_SAA_1INSTITUTION',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SAA_1INSTITUTION'),
											placeholder: $translate.instant('F1_SAA_1INSTITUTION')
										}
									},
									{
										key: 'F1_SAA_1ADDRESS',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SAA_1ADDRESS'),
											placeholder: $translate.instant('F1_SAA_1ADDRESS')
										}
									},
									{
										key: 'F1_SAA_1PHONE',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SAA_1PHONE'),
											placeholder: $translate.instant('F1_SAA_1PHONE')
										}
									}
								]
							},
							{
								sectionB: [
									{
										template: '<div><H4><span translate="F1_SBB"></span></H4></div>'
									},
									{
										template: '<hr /><div><strong>1.</strong></div>',
										className: 'fieldgroup'
									},
									{
										key: 'F1_SBB_1CLIENT',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT'),
											placeholder: $translate.instant('F1_1SBB_CLIENT')
										}
									},
									{
										key: 'F1_SBB_1CLIENT_FIRSTNAME',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_FIRSTNAME'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_FIRSTNAME')
										}
									},
									{
										key: 'F1_SBB_1CLIENT_NUM',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_NUM'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_NUM')
										}
									},
									{
										key: 'F1_SBB_1CLIENT_FILE',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_FILE'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_FILE')
										}
									},
									{
										key: 'F1_SBB_1CLIENT_STREET',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_STREET'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_STREET')
										}
									},
									{
										key: 'F1_SBB_1CLIENT_NUM2',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_NUM2'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_NUM2')
										}
									},
									{
										key: 'F1_SBB_1CLIENT_NUM3',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_NUM3'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_NUM3')
										}
									},
									{
										key: 'F1_SBB_1CLIENT_POSTALCODE',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_POSTALCODE'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_POSTALCODE')
										}
									},
									{
										key: 'F1_SBB_1CLIENT_PLACE',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_PLACE'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_PLACE')
										}
									},
									{
										key: 'F1_SBB_1CLIENT_EMAIL',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_EMAIL'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_EMAIL')
										},
										validators: {
											EmailAddress: {
												expression: function ($viewValue, $modelValue) {
													var value = $modelValue || $viewValue;
													return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
												},
												message: '$viewValue + $translate.instant("NO_VALID_EMAIL")'
											}
										},
										validation: {
											messages: {
												required: function ($viewValue, $modelValue, scope) {
													return scope.to.label + ' is required';
												}
											}
										}
									},
									{
										key: 'F1_SBB_1CLIENT_PHONE',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_1CLIENT_PHONE'),
											placeholder: $translate.instant('F1_SBB_1CLIENT_PHONE')
										}
									},
									{
										template: '<hr /><div><strong>2.</strong></div>',
										className: 'fieldgroup'
									},
									{
										key: 'F1_SBB_2CLIENT_Q2',
										className: 'field',
										type: 'select',
										templateOptions: {
											label: $translate.instant('F1_SBB_2CLIENT_Q2'),
											options: [
												{
													name: $translate.instant('F1_SBB_2CLIENT_Q2_A1'),
													value: '0'
												},
												{
													name: $translate.instant('F1_SBB_2CLIENT_Q2_A2'),
													value: '1'
												},
												{
													name: $translate.instant('F1_SBB_2CLIENT_Q2_A3'),
													value: '2'
												}
											]
										}
									},
									{
										template: '<hr /><div><strong>3.</strong></div>',
										className: 'fieldgroup'
									},
									{
										key: 'F1_SBB_3CLIENT_HEALTH_INSURANCE',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_3CLIENT_HEALTH_INSURANCE'),
											placeholder: $translate.instant('F1_SBB_3CLIENT_HEALTH_INSURANCE')
										}
									},
									{
										key: 'F1_SBB_3CLIENT_NAME_FUND',
										className: 'field',
										type: 'input',
										templateOptions: {
											type: 'text',
											label: $translate.instant('F1_SBB_3CLIENT_NAME_FUND'),
											placeholder: $translate.instant('F1_SBB_3CLIENT_NAME_FUND')
										}
									}
								]
							}
						];

						//*******
						for (var key in  vm.model) {
							var obj = vm.model[key][Object.keys(vm.model[key])[0]];
							for (var prop in obj) {
								if (obj.hasOwnProperty(prop) && prop.indexOf('_DATE') > 0) {
									obj[prop] = new Date(obj[prop]);
								}
							}
						}
					}

					$scope.$watch('vm.selectedSection', function (newValue) {
						for (var key in vm.model) {
							if (newValue == Object.keys(vm.model[key])[0]) {
								vm.selectedKey = key;
							}
						}
					});
				}
			});

		vm.s = function () {
			save().then(function () {
						$state.go('main.private.dashboard.abstract.notifications.addnotification', {
							id: vm.formInfo.id,
							name: vm.formInfo.name
						});
				}
			);
		};

		function save() {
			var deferred = $q.defer();
			paramsPOST = {};
			paramsPOST.id = vm.id;
			paramsPOST.data = {};
			paramsPOST.data.sections = vm.model;
			paramsPOST.blank = null;

			http.post(vm.setUrl, paramsPOST)
				.then(function (res) {
					blockUI.stop();
					deferred.resolve(res);
					if (res.state) {
						alertService.add(0, res.state.message);
					}
				}, function (error) {
					deferred.reject(error);
				});
			return deferred.promise;
		}

		function onSubmit() {
			save().then(function () {
				$timeout(function () {
					$state.go(vm.mainState);
				}, 0);
			});
		}

	});