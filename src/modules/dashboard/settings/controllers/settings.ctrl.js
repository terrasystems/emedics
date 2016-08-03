(function () {
	/*jshint -W117, -W097*/

	angular.module('modules.dash')

		.controller('settingsCtrl', function ($translate, blockUI, http, DTO, regFields, alertService, userTypes, localStorageService) { //NOSONAR
			var vm = this,
					criteriaDTO = DTO.criteriaDTO(),
					userDTO = DTO.userDTO(),
					changePassDTO = DTO.changePassDTO();
			vm.settingsModel = localStorageService.get('user');
			vm.settingsFields = {};
			vm.onSubmitForm = onSubmitForm;
			vm.settingsModel.userType === userTypes.patient  ? null : criteriaDTO.type = vm.settingsModel.type.userType;

			selectFormlyFieldsByType();
			removePassField();
			getTypes();

			// functions declarations:
			// prepare formly fields
			function selectFormlyFieldsByType() {
				switch (vm.settingsModel.userType) {
					case userTypes.patient:
						vm.settingsFields = regFields.patient();
						break;
					case userTypes.doctor:
						vm.settingsFields = regFields.doctor();
						break;
					case userTypes.org:
						vm.settingsFields = regFields.org();
						break;
					default:
						break;
				}
			};
			// remove pass field from form
			function removePassField() {
				var idx = _.findIndex(vm.settingsFields, function(field) { return field.key === 'pass'; });
				vm.settingsFields.splice(idx, 1);
			};

			// add select types to form
			function getTypes() {
				blockUI.start();
				http.post('/types/all', criteriaDTO)
					.then(function (res) {
						addTypesToFieldOptions(res.result);
						blockUI.stop();
					});
			};

			function addTypesToFieldOptions(types) {
				var idx = _.findIndex(vm.settingsFields, function(field) { return field.key === 'type'; });
				vm.settingsFields[idx].templateOptions.options = _.map(types, function (item) {
					item.value = {
						id: item.id,
						name: item.name,
						userType: item.userType
					};
					return item;
				});
			};

			function onSubmitForm(form) {
				if(form.$name === 'vm.passForm') {
					changePassDTO.newPass = vm.pass.new;
					changePassDTO.oldPass = vm.pass.old;
					changePassword(changePassDTO);
				} else {
					userDTO = DTO.mergeDTO(userDTO, vm.settingsModel);
					saveSettings(userDTO);
				}
			};

			//TODO: implement post request to /user/edit
			function saveSettings(userDTO) {
				blockUI.start();
				http.post('/user/edit', userDTO)
					.then(function (res) {
						alertService.success($translate.instant(res.msg));
						blockUI.stop();
					});
			};

			//TODO: implement post request to /user/change_pass
			function changePassword(changePassDTO) {
				blockUI.start();
				http.post('/user/change_pass', changePassDTO)
					.then(function (res) {
						alertService.success($translate.instant(res.msg));
						blockUI.stop();
					});
			};

		});
})();