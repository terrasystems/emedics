'use strict';
/*jshint -W117, -W097, -W116*/

angular.module('modules.dash')
	.controller('patientsTemplatesCtrl', function(localStorageService, $stateParams, $state, blockUI, http){
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.templates = [];

		if (!$stateParams.id || $stateParams.id === '' || $stateParams.id === null) {
			$state.go('^');
			return;
		}

		vm.patient = {
			id: $stateParams.id,
			name: $stateParams.name,
			email: $stateParams.email,
			phone: $stateParams.phone
		};

		vm.onGetTemplates = function (id) {
			vm.templates = [];
			http.get('/catalog/byUserId/' + id )
				.then(function (res) {
					blockUI.stop();
					if (res.result && angular.isArray(res.result) ) {
						vm.templates = res.result;
					}
				});
		};
		vm.onGetTemplates($stateParams.id);

		vm.onReturn = function() {
			$state.go('^');
		};

		vm.onOpenHistory = function(arr) {
			$state.go('main.private.dashboard.user.history',{patient: vm.patient, obj: arr});
		};

	});