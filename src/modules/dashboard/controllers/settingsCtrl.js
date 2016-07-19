'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('settingsCtrl', function ($state,DTO,alertService, blockUI, $rootScope, http, settings_fields, auth, $translate) {
		var vm = this;
		vm.settings_fields = settings_fields;
		vm.settings_model = {};
		vm.settings_options = {};
		vm.changedPass = DTO.changedPass;
		vm.PassConfirm = DTO.confirmPass;
		var base = $rootScope.db;

		http.get('private/userInfo')
			.then(function (res) {
				blockUI.stop();
				vm.settings_model = res.user;
				vm.settings_model.isHideOrgType = !res.user.org;
				vm.settings_model.isHideDoctorType = (res.user.type !== 'doctor') || res.user.org;
			});

		vm.getTypesDoc = function() {
			http.get('public/dashboard/doc_type/doctor')
				.then(function (res) {
					blockUI.stop();
					if (res.result && angular.isArray(res.result)) {
						res.result.map(function (item) {
							var x = angular.copy(item.id);
							delete item.id;
							item.value = x;
							item.name = $translate.instant(item.name);
							return item;
						});
						vm.settings_fields[6].templateOptions.options = res.result;
					}
				});
		};
		vm.getTypesDoc();

		vm.getTypesOrg = function() {
			http.get('public/dashboard/doc_type/organization')
				.then(function (res) {
					blockUI.stop();
					if (res.result && angular.isArray(res.result)) {
						res.result.map(function (item) {
							var x = angular.copy(item.id);
							delete item.id;
							item.value = x;
							item.name = $translate.instant(item.name);
							return item;
						});
						vm.settings_fields[5].templateOptions.options = res.result;
					}
				});
		};
		vm.getTypesOrg();

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
			}).then(function(){
				window.location.reload();
			});
		};

	});