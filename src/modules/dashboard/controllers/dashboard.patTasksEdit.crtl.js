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
					vm.checkArr = (res.result && res.result.blank && res.result.blank.body && res.result.blank.body.sections && res.result.id);
				} else {
					vm.checkArr = (res.result && res.result.form && res.result.form.blank && res.result.form.blank.body && res.result.form.blank.body.sections && res.result.form.id);
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
					vm.sections = [];
					if ($stateParams.type == 'tasks') {
						vm.sections = eval($base64.decode(res.result.blank.body.sections));
						vm.sections.forEach(function (item) {
							vm.sectionsName.push(Object.keys(item)[0]);
						});
					} else {
						vm.sections = eval($base64.decode(res.result.form.blank.body.sections));
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