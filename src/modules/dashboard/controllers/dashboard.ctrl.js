'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('DashCtrl', function ($scope, $rootScope,$log,pouchDB, localStorageService, $state, $translate, http, blockUI, DTO) {
		var vm = this;
		vm.user = localStorageService.get('userData');

		vm.tabData = [{heading: $translate.instant('TASKS'), route: 'main.private.dashboard.tasks', disable: false},
			{heading: $translate.instant('REFERENCES'), route: 'main.private.dashboard.references', disable: false },
			{heading: $translate.instant('NOTIFICATIONS'),badge: 0, route: 'main.private.dashboard.notifications', disable: false },
			{heading: $translate.instant('MYFORMS'), route:'main.private.dashboard.catalog', disable: false},
			{heading: $translate.instant('DRAFTS'), route:'main.private.dashboard.drafts', disable: false}
	];

		if ('patient'!==vm.user.type) {
			vm.tabData.push({
				heading: $translate.instant('PATIENTS'),
				route: 'main.private.dashboard.patients',
				disable: false
			});
		}

		if (vm.user.org == 'true' || vm.user.org == true || vm.user.type == 'stuff') {
			vm.tabData.push({heading: $translate.instant('STUFF'),
				route:'main.private.dashboard.staff',
				disable: false});
		}

		$rootScope.db = pouchDB(vm.user.id);
		var base= $rootScope.db;
		var doc = {
			_id:new Date().toISOString(),
			status:'draft',
			body:{}
		};
		function error(err) {
			$log.error(err);
		}

		function get(res) {
			if (!res.ok) {
				return error(res);
			}
			return base.get(res.id);
		}

		function bind(res) {
			$scope.doc = res;
		}

		$scope.$state = $state;

		vm.logout = function () {
			$rootScope.userData = null;
			$rootScope.token = null;
			localStorageService.set('token', null);
			localStorageService.set('userData', null);
			$state.go('main.public.login');
		};

		$scope.$on('calc.notif', function () {
				http.post('/notifications/all', DTO.criteriaDTO())
					.then(function (res) {
						blockUI.stop();
						if (res.result) {
							vm.tabData[2].badge = res.result.length;
						}
					});
			}
		);

		$scope.$on('change.username', function() {
			vm.user = localStorageService.get('userData');
		});

		$rootScope.$broadcast('calc.notif');

	})	.run(["$templateCache", function($templateCache) {
		$templateCache.put("uib/template/tabs/tab.html",
			"<li ng-class=\"[{active: active, disabled: disabled}, classes]\" class=\"uib-tab nav-item\">\n" +
			"<a href ng-click=\"select($event)\" class=\"nav-link\" uib-tab-heading-transclude>{{heading}}<div ng-show='$parent.tab.badge > 0'>{{$parent.tab.badge}}</div></a>\n" +
			"<div class='notif_counter' ng-show='$parent.tab.badge > 0'>{{$parent.tab.badge}}</div></li>\n" +
			"");
	}]);
