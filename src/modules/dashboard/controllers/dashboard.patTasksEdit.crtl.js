'use strict';
/*jshint -W117, -W097, -W116, -W089, -W061*/

angular.module('modules.dash')

	.controller('patientTasksEditCtrl', function (http, $q, $stateParams, $state, localStorageService, blockUI, $scope, alertService, $timeout, $translate, $base64) {
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
			//vm.getUrl = 'private/dashboard/' + vm.user.type + '/forms/' + vm.id;
			//vm.setUrl = 'private/dashboard/' + vm.user.type + '/forms/edit';
			vm.getUrl = 'private/dashboard/tasks/' + vm.id;
			vm.setUrl = 'private/dashboard/tasks/edit';
		} else {
			vm.getUrl = 'private/dashboard/docpatients/forms/'+vm.id;
			vm.setUrl = 'private/dashboard/docpatients/forms/edit';
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
					vm.checkArr = (res.result && res.result.template && res.result.template.body && res.result.template.body.sections && res.result.id);
				} else {
					vm.checkArr = (res.result && res.result.form && res.result.form.template && res.result.form.template.body && res.result.form.template.body.sections && res.result.form.id);
				}

				if (vm.checkArr) {
					vm.model = (res.result.data && res.result.data.sections) ? res.result.data.sections : undefined;
					vm.formInfo = {};
					vm.formInfo.id = ($stateParams.type == 'tasks') ?  res.result.id : res.result.form.id;
					vm.formInfo.category = ($stateParams.type == 'tasks') ? res.result.template.category : res.result.form.template.category;
					vm.formInfo.name =($stateParams.type == 'tasks') ? res.result.template.name : res.result.form.template.name;
					vm.formInfo.number = ($stateParams.type == 'tasks') ? res.result.template.number : res.result.form.template.number;
					vm.formInfo.descr = ($stateParams.type == 'tasks') ? res.result.template.descr : res.result.form.template.descr;

					vm.sectionsName = [];
					vm.sections = [];
					if ($stateParams.type == 'tasks') {
						vm.sections = eval($base64.decode(res.result.template.body.sections));
						vm.sections.forEach(function (item) {
							vm.sectionsName.push(Object.keys(item)[0]);
						});
					} else {
						vm.sections = eval($base64.decode(res.result.form.template.body.sections));
						vm.sections.forEach(function (item) {
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
						for (var key in  vm.model) {
							var obj = vm.model[key][Object.keys(vm.model[key])[0]];
							for (var prop in obj) {
								if (obj.hasOwnProperty(prop) && prop.indexOf('_DATE') > 0 && obj[prop] !== null) {
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
			paramsPOST = {page: {start: 0, count: 20},criteria: {edit: {data:{}}, create: null}};
			paramsPOST.criteria.edit.id = vm.id;
			paramsPOST.criteria.edit.data.sections = vm.model;
			//paramsPOST.id = vm.id;
			//paramsPOST.data = {};
			//paramsPOST.data.sections = vm.model;
			//paramsPOST.blank = null;

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