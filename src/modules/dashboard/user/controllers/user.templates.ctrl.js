(function () {
	/*jshint -W117, -W097, -W116*/

	angular.module('modules.dash')
		.controller('userTemplatesCtrl', function (localStorageService, $stateParams, $state, blockUI, http) {
			var vm = this;
			vm.user = localStorageService.get('user');
			vm.templates = [];
			vm.patient = $stateParams;

			if (!$stateParams  && !$stateParams.id) {
				$state.go('^');
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
				$state.go('^');
			};

			vm.openHistory = function (arr) {
				$state.go('^.history', {patient: vm.patient, obj: arr});
			};

		});
})();
