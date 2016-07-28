(function(){
	/*jshint -W117, -W097, -W089, -W061*/
	angular.module('modules.auth')
		.controller('forgotpasswordCtrl', function ($translate, blockUI, alertService, $timeout, http, $state) {
			var vm = this;

			vm.fields = [
				{
					key: 'email',
					type: 'input',
					validators: {
						EmailAddress: {
							expression: function ($viewValue, $modelValue) {
								var value = $modelValue || $viewValue;
								return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
							},
							message: '$viewValue + $translate.instant("NO_VALID_EMAIL")'
						}
					},
					validation: {
						messages: {
							required: function ($viewValue, $modelValue, scope) {
								return scope.to.label + ' is required';
							}
						}
					},
					templateOptions: {
						placeholder: $translate.instant('RESET_PASS'),
						type: 'text',
						required: true,
						addonRight: {
							class: 'glyphicon glyphicon-envelope'
						}
					}
				}
			];

			vm.submit = function () {
				blockUI.start();
				http.post('/auth/reset_pass', vm.model)
					.then(function (res) {
						blockUI.stop();
						alertService.success(res.msg);
						$timeout(function () {
							$state.go('main.auth.login');
						}, 500);
					}, function () {
						blockUI.stop();
						$timeout(function () {
							$state.go('main.auth.login');
						}, 500);
					});
			};
		});
})();
