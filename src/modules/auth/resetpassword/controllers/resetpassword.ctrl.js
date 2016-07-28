(function(){
	/*jshint -W117, -W097, -W089, -W061*/
	angular.module('modules.auth')
		.controller('resetpasswordCtrl', function ($stateParams, $translate, blockUI, http,	alertService, $timeout,	$state) {
			var vm = this;
			if (!$stateParams.key) {
				$state.go('main.auth.login');
				return;
			}

			vm.fields = [
				{
					key: 'password',
					type: 'input',
					templateOptions: {
						label: 'Password',
						type: 'password',
						required: true,
						placeholder: $translate.instant('Enter new password...')
					},
					validation: {
						show: false
					}
				},
				{
					key: 'confirmPassword',
					type: 'input',
					templateOptions: {
						label: 'Confirm password',
						type: 'password',
						required: true,
						placeholder: $translate.instant('Confirm new password...')
					},
					validation: {
						show: true
					},
					validators: {
						samePassword2: function ($viewValue, $modelValue, scope) {
							var value = $modelValue || $viewValue;
							if (value) {
								return $modelValue === scope.model.password;
							} else {
								return true;
							}
						}
					}
				}
			];

			vm.submit = function () {
				blockUI.start();
				http.post('/auth/change_pass', {
					validKey: $stateParams.key,
					newPassword: vm.model.password
				})
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
