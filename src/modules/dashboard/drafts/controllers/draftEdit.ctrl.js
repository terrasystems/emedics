'use strict';
/*jshint -W117, -W097, -W116*/
angular.module('modules.dash')
	.controller('draftEditCtrl', function ($stateParams, $state, $scope, alertService, $translate, $rootScope, pouch_db, forEditTask) {
		var vm = this;

		if (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go('main.private.dashboard.abstract.drafts');
			return;
		}

		vm.data = { sections: [], options: [], model: [], sectionsName: [], selectedSection: '', selectedKey: '', editModel: {}, formInfo: {} };

		forEditTask.getModel('', $stateParams.id)
			.then(function(res) {
				vm.data = res;

				$scope.$watch('vm.data.selectedSection', function (newValue) {
					for (var key in vm.data.model) {
						if (newValue == Object.keys(vm.data.model[key])[0]) {
							vm.data.selectedKey = key;
						}
					}
				});
			});

		vm.onSaveDraft = function() {
			pouch_db.save($rootScope.db, $stateParams.id, vm.data.formInfo, vm.data.model)
				.then(function() {
					alertService.add(0, 'Saved - Ok!');
					$state.go('main.private.dashboard.abstract.drafts');
				});
		};

		vm.onReturn = function () {
			$state.go('main.private.dashboard.abstract.drafts');
		};

	});