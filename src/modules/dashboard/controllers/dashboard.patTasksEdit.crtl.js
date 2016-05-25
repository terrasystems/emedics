'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')

	.controller('patientTasksEditCtrl', function (http, $q, $stateParams, $state, localStorageService, blockUI, $scope, alertService, $timeout) {
		console.log('Type: ' + $stateParams.type + ' id: ' + $stateParams.id + ' patId: ' + $stateParams.patId);

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
			vm.getUrl = '';
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
				if (res.result && res.result.blank && res.result.blank.body && res.result.blank.body.sections && angular.isArray(res.result.blank.body.sections) && res.result.id) {

					vm.model = (res.result.data && res.result.data.sections) ? res.result.data.sections : undefined;
					vm.formInfo = {};
					vm.formInfo.id = res.result.id;
					vm.formInfo.category = res.result.blank.category;
					vm.formInfo.name = res.result.blank.name;
					vm.formInfo.number = res.result.blank.number;
					vm.formInfo.descr = res.result.blank.descr;

					vm.sectionsName = [];
					res.result.blank.body.sections.forEach(function (item) {
						vm.sectionsName.push(Object.keys(item)[0]);
					});
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
						vm.sections = res.result.blank.body.sections;

						for (var key in  vm.model) {
							var obj = vm.model[key][Object.keys(vm.model[key])[0]];
							for (var prop in obj) {
								if (obj.hasOwnProperty(prop) && prop.indexOf('date_') === 0) {
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