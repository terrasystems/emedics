'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('settingsCtrl', function ($state,alertService, blockUI, $rootScope, http, settings_fields, auth) {
		var vm = this;
		vm.settings_fields = settings_fields;
		vm.settings_model = {};
		vm.settings_options = {};
		vm.changedPass = {oldPass: '', newPass: ''};
		vm.PassConfirm = {confirm: ''};
		var base = $rootScope.db;

		http.get('private/userInfo')
			.then(function (res) {
				blockUI.stop();
				vm.settings_model = res.user;
			});

		vm.onSave = function () {
			http.post('private/user_edit', vm.settings_model)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
						auth.saveUserData(res);
						$rootScope.$broadcast('change.username');
					}
				});
		};

		vm.onChangePass = function () {
			http.post('private/change_pass', vm.changedPass)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
						vm.changedPass = {oldPass: '', newPass: ''};
						vm.PassConfirm = {confirm: ''};
					}
				});
		};


vm.cleanCache = function (){

	base.destroy().then(function (response) {
		// success
	}).catch(function (err) {
		console.log(err);
	});
	window.location.reload();
	$state.go('main.private.dashboard.abstract.drafts');
};
	});