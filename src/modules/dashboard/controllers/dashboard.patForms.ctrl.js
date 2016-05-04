'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientFormsCtrl', function ($state, $filter, http, localStorageService, blockUI) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.patientForms = [
			{
				"id": 0,
				"body": "",
				active: false,
				"name": "Crane",
				"type": "org",
				"descr": "Hello, Crane! You have \"org\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 1,
				"body": "",
				active: false,
				"name": "Felicia",
				"type": "doc",
				"descr": "Hello, Felicia! You have \"doc\" unread messages.",
				"category": "Category 1"
			},
			{
				"id": 2,
				"body": "",
				active: false,
				"name": "Lorena",
				"type": "pat",
				"descr": "Hello, Lorena! You have \"pat\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 3,
				"body": "",
				active: false,
				"name": "Lindsey",
				"type": "pat",
				"descr": "Hello, Lindsey! You have \"pat\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 4,
				"body": "",
				"name": "Pacheco",
				active: false,
				"type": "pat",
				"descr": "Hello, Pacheco! You have \"pat\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 5,
				"body": "",
				"name": "Tamera",
				active: false,
				"type": "pat",
				"descr": "Hello, Tamera! You have \"pat\" unread messages.",
				"category": "Category 2"
			},
			{
				"id": 6,
				"body": "",
				"name": "Mejia",
				active: false,
				"type": "pat",
				"descr": "Hello, Mejia! You have \"pat\" unread messages.",
				"category": "Category 1"
			},
			{
				"id": 6,
				"body": "",
				"name": "Mejia",
				active: false,
				"type": "pat",
				"descr": "Hello, Mejia! You have \"pat\" unread messages.",
				"category": "Category 1"
			}, {
				"id": 6,
				"body": "",
				active: false,
				"name": "Mejia",
				"type": "pat",
				"descr": "Hello, Mejia! You have \"pat\" unread messages.",
				"category": "Category 1"
			}, {
				"id": 6,
				"body": "",
				active: false,
				"name": "Mejia",
				"type": "pat",
				"descr": "Hello, Mejia! You have \"pat\" unread messages.",
				"category": "Category 1"
			}];

		var paramsPOST = {
			"page": {
				"start": 0,
				"count": 20
			},
			"criteria": {}
		};

		http.post('private/dashboard/'+vm.user.type+'/forms', paramsPOST)
			.then(function (res) {
				blockUI.stop();
				if  (res.result /* && res.page */) {
					vm.patientForms = res.result;
					vm.page = res.page;
				}
			});

		vm.save = function () {
			vm.result = $filter('filter')(vm.patientForms, {active: true});
			paramsPOST.criteria.list = [];

			vm.result.forEach(function(item, index) {
				if (item.active && item.active===true && item.id)	{
					paramsPOST.criteria.list.push(item.id);
				}
			})

			http.post('private/dashboard/'+vm.user.type+'/forms/active/modify', paramsPOST)
				.then(function (res) {
					blockUI.stop();
					console.log(res);
					$state.go('main.private.dashboard.tasks');
					//$state.go('main.private.dashboard.tasks', {activeForms: $filter('filter')(vm.patientForms, {active: true})});
				});

		};

	});
