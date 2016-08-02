(function () {
	/*jshint -W117, -W097, -W116*/

	angular.module('modules.dash')
		.controller('userTemplatesCtrl', function (localStorageService, $stateParams, $state, blockUI, http) {
			var vm = this;
			vm.user = localStorageService.get('user');
			vm.templates = [];
			vm.forUser = $stateParams;

			if (!$stateParams  && !$stateParams.id) {
				$state.go('^.^.tasks');
				return;
			}



			vm.onGetTemplates = function (id) {
				vm.templates = [];
				http.get('/catalog/usedByUser/' + id)
					.then(function (res) {
						blockUI.stop();
						if (res.result && angular.isArray(res.result)) {
							vm.templates = res.result;
						}
					});
			};
			vm.onGetTemplates($stateParams.id);

			vm.return = function () {
				$state.go('^.^.tasks');
			};

			vm.openHistory = function (arr) {
				$state.go('^.history', {forUser: vm.forUser, obj: arr});
			};

		});
})();
