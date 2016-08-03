(function () {
	/*jshint -W117, -W097*/

	angular.module('modules.dash')

		.controller('settingsCtrl', function (blockUI, http, DTO, regFields, userTypes, localStorageService) {
			var vm = this,
					criteriaDTO = DTO.criteriaDTO();
			vm.settingsModel = localStorageService.get('user');
			vm.settingsFields = {};
			vm.onSubmitForm = onSubmitForm;

			vm.settingsModel.userType === userTypes.patient  ? null : criteriaDTO.type = vm.settingsModel.type.userType;

			//prepare formly fields
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

			removePassField();
			getTypes();

			// functions declarations
			function removePassField() {
				var idx = _.findIndex(vm.settingsFields, function(field) { return field.key === 'pass'; });
				vm.settingsFields.splice(idx, 1);
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
					saveSettings();
				} else {
					changePassword();
				}
			};

			function getTypes() {
				http.post('/types/all', criteriaDTO)
					.then(function (res) {
						addTypesToFieldOptions(res.result);
					});
			};

			//TODO: implement post request to /user/edit
			function saveSettings() {
			};

			//TODO: implement post request to /auth/change_pass
			function changePassword() {
			};

		});
})();