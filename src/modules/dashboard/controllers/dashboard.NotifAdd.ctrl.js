'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')
	.controller('addNotificationCtrl', function ($scope, http, blockUI, initParamsPOST, localStorageService) {
		//console.log('addNotificationCtrl is working');
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.message = {
			'id': null,
			'date': null,
			'readtype': null,
			'type': null,
			'title': '',
			'text': '',
			'fromId': null,
			'toId': null,
			'userForm': null
		};
		$scope.doctor = {selected : ''};
		$scope.form = {selected : ''};

		vm.forms = [
			{
				'id': 1,
				'name': 'Form First'
			},
			{
				'id': 2,
				'name': 'Form Second'
			},
			{
				'id': 3,
				'name': 'Form Third'
			},
			{
				'id': 4,
				'name': 'Form Fourth'
			},
			{
				'id': 5,
				'name': 'Form Fifth'
			}
		].sort();

		http.post('private/dashboard/' + vm.user.type + '/forms/active', initParamsPOST.params)
			.then(function (res) {
				blockUI.stop();
				if (res.result) {
					vm.forms = res.result;
				}
			});

		vm.doctors = [
			{
				'id': 12,
				"name": "Petya",
				'tel': 89879879879,
				"city": "Khmelnitsky"
			},
			{
				'id': 130,
				"name": "Vitya",
				"tel": 1456364,
				"city": "Khmelnitsky"
			},
			{
				'id': 222,
				"name": "Andrew",
				"tel": 26576757,
				"city": "Khmelnitsky"
			},
			{
				'id': 602,
				"name": "Anton",
				"tel": 233,
				"city": "Khmelnitsky"
			},
			{
				'id': 1,
				"name": "Misha",
				"tel": 434435,
				"city": "Khmelnitsky"
			}
		].sort();

		vm.paramsPOST = initParamsPOST.params;
		vm.paramsPOST.criteria.list = [];
		http.get('private/dashboard/' + vm.user.type + '/references', vm.paramsPOST)
			.then(function (res) {
				console.log('get all..');
				blockUI.stop();
				if (res.result) {
					vm.doctors = res.result;
				}
			});

		//////////////////////////////////////////

		vm.getDoctors = function (search) {
			//console.log('getDoctors: '+search);
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
			//console.log('getForms: '+search);
			vm.newForms = vm.forms.slice();
			if (search && vm.newForms.indexOf(search) === -1) {
				vm.newForms.unshift(search);
			}
			return vm.newForms;
		};

		vm.send = function () {
			console.log(vm.message);
			http.post('private/dashboard/notifications/send', vm.message)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.forms = res.result;
					}
				});
		};

	});
