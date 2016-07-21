'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('notificationsCtrl', function (http, $scope, blockUI, alertService, $rootScope, DTO) {
		var vm = this;
		vm.UnreadNotifications = [];

		vm.allNotifications = function (val) {
			var criteriaDTO = DTO.criteriaDTO();
			criteriaDTO.search = val;
			return http.post('/notifications/all', criteriaDTO)
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.UnreadNotifications = res.result;
					}
					return res.result;
				});
		};
		vm.allNotifications();

		vm.Accept = function (id) {
			http.get('/notifications/accept/' + id)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						return res.result;
					}
					$rootScope.$broadcast('calc.notif');
					vm.allNotifications();
				});
		};

		$rootScope.$broadcast('calc.notif');

		vm.Decline = function (id) {
			http.get('/notifications/decline/' + id)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						return res.result;

					}
					$rootScope.$broadcast('calc.notif');
					vm.allNotifications();
				});
		};

		vm.convertDate = function (d) {
			var y = new Date(d);
			return y.toLocaleString().replace(',', ' / ');
		};

	});
