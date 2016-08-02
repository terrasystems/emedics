(function () {
	/*jshint -W117, -W097, -W089, -W061*/
	angular.module('modules.auth')
		.controller('successregistrationCtrl', function ($state) {
			var vm = this;
			vm.backToLogin = function () {
				$state.go('main.auth.login');
			};

		});
})();
