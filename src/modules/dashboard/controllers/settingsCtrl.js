'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('settingsCtrl', function (alertService, blockUI, $rootScope, http, auth) {
		var vm = this;

		vm.paramsPOST = {
			id: null,
			password: '',
			username: angular.copy($rootScope.userData.username),
			email: angular.copy($rootScope.userData.email),
			typeExp: angular.copy($rootScope.userData.typeExp),
			type: null
		};

		vm.changedPass={
			'oldPass':'',
			'newPass':''

		};
		vm.PassConfirm={
			'confirm':''
		};

		//vm.disSave=function(){
		//	if(vm.changePass.newPass === vm.PassConfirm.confirm){
		//		return false;
		//	}else{
		//		return true;
		//	}
		//		};

		vm.onChangePass=function(){
			console.log(vm.changedPass);
			http.post('private/change_pass', vm.changedPass)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {

						alertService.add(0, res.state.message);
					}
				});
		};

			vm.onSave = function () {
			console.log(vm.paramsPOST);
			http.post('private/user_edit', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
						auth.saveUserData(res);
					}
				});
		};

	});
