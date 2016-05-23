'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')
	.controller('addNotificationCtrl', function ($scope, http, blockUI, initParamsPOST, localStorageService, alertService, $timeout, $state) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.message = {
			'id': null,
			'date': null,
			'readtype': null,
			'type': null,
			'title': '',
			'text': '',
			'fromUser': {id: null},
			'toUser': {id: null},
			'userForm': null
		};

		vm.forms = [];
		vm.doctors = [];

		$scope.doctor = {selected: ''};
		$scope.form = {selected: ''};

		http.post('private/dashboard/' + vm.user.type + '/forms/active', initParamsPOST.params)
			.then(function (res) {
				blockUI.stop();
				if (res.result) {
					vm.forms = res.result;
				}
			});

		http.get('private/dashboard/' + vm.user.type + '/references', initParamsPOST.params)
			.then(function (res) {
				blockUI.stop();
				if (res.result) {
					vm.doctors = res.result;
				}
			});

		//////////////////////////////////////////

		vm.getDoctors = function (search) {
			vm.newDocs = vm.doctors.slice();
			if (search && vm.newDocs.indexOf(search) === -1) {
				vm.newDocs.unshift(search);
			}
			return vm.newDocs;
		};

		$scope.$watch('doctor.selected', function (newVal, oldVal) {
			vm.doc = '';
			if (newVal !== oldVal) {
				if (vm.doctors.indexOf(newVal) === -1) {
					vm.doctors.unshift(newVal);
				}
			}
		});

		$scope.$watch('form.selected', function (newVal, oldVal) {
			vm.form = '';
			if (newVal !== oldVal) {
				if (vm.forms.indexOf(newVal) === -1) {
					vm.forms.unshift(newVal);
				}
			}
		});

		vm.getForms = function (search) {
			vm.newForms = vm.forms.slice();
			if (search && vm.newForms.indexOf(search) === -1) {
				vm.newForms.unshift(search);
			}
			return vm.newForms;
		};

		vm.send = function () {
			http.post('private/dashboard/notifications/send', vm.message)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
					$timeout(function () {
						$state.go('main.private.dashboard.notifications');
					}, 500);
				});
		};

	});
