(function () {


	/*jshint -W117, -W097*/

	angular.module('modules.dash')
		.controller('referencesEditorCtrl', function ($scope, $translate, $state, localStorageService, http, blockUI, DTO,alertService) {
			var vm = this;
			vm.user = localStorageService.get('user');
			vm.criteriaDTO = DTO.criteriaDTO();
			vm.referencesDTO = DTO.referencesDTO();
			vm.user = {};
			vm.date = [
				{
					className: '',
					key: 'dob',
					type: 'datepicker',
					templateOptions: {
						type: 'text',
						required: true,
						label: $translate.instant('BIRTH_DATE'),
						placeholder: $translate.instant('BIRTH_DATE'),
						datepickerPopup: 'yyyy-MMMM-dd'
					}
				}
			];

			vm.tabPatient = function () {
				vm.referencesDTO.userType = 'PATIENT';
			};

			vm.tabDoctor = function () {
				vm.referencesDTO.userType = 'DOCTOR';
			};
			vm.tabDoctor();

			vm.create = function () {
				vm.referencesDTO.dob = vm.user.dob.toISOString();

				http.post('/references/create', vm.referencesDTO)
					.then(function (resp) {
						blockUI.stop();
						$state.go('main.dashboard.references');
						alertService.success(resp.msg);
					});
			};

			vm.getTypes = function () {
				vm.criteriaDTO.type = 'DOCTOR';
				http.post('/types/all', vm.criteriaDTO)
					.then(function (res) {
						blockUI.stop();
						if (res.result) {
							vm.types = res.result;
						}
					});
			};
			vm.getTypes();


		});
})();