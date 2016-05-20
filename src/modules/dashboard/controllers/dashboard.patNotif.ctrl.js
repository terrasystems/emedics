'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientNotifCtrl', function (http, blockUI, initParamsPOST, alertService) {
		var vm = this;
		vm.UnreadNotifications = [];
		vm.searchnotif = '';

		vm.UnreadNotifications = [
		{
			'id': '1212',
			'date': new Date(),
			'readtype': 'true',
			'type': '1',
			'title': 'Test Title',
			'text': 'Test Text',
			'fromUser': {id: '4444', username: 'Test #1'},
			'toUser': {id: '333'},
			'userForm': '2222'
		},
		{
			'id': '1818',
			'date': new Date(),
			'readtype': 'true',
			'type': '1',
			'title': 'Test Title #2',
			'text': 'Test Text #2',
			'fromUser': {id: '333', username: 'Test #2'},
			'toUser': {id: '4444'},
			'userForm': '2222'
		}
		];

		http.post('private/dashboard/notifications', initParamsPOST.params)
			.then(function (res) {
				blockUI.stop();
				if  (res.result) {
					if  (angular.isArray(res.result) && res.result.length>0) {
						vm.UnreadNotifications = res.result;
					}
				}
			});

		vm.onAccept = function (id) {
			console.log('accept id: '+id);
			http.get('private/dashboard/notifications/accept/'+id)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
				});
		};

		vm.onDecline = function (id) {
			console.log('decline id: '+id);
			http.get('private/dashboard/notifications/decline/'+id)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
				});
		};

	});
