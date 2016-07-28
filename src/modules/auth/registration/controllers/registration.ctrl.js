(function(){
	/*jshint -W117, -W097, -W089, -W061*/
	angular.module('modules.auth')
		.controller('registrationCtrl', function (regFields, $translate, DTO, http,$state, userTypes) {
			var vm = this;
			vm.reg = {};
			vm.resetAllForms = invokeOnAllFormOptions.bind(null, 'resetModel');

			function invokeOnAllFormOptions(fn) {
				angular.forEach(vm.tabs, function(tab) {
					if (tab.form.options && tab.form.options[fn]) {
						tab.form.options[fn]();
					}
				});
			};

			vm.selTab = function (index) {
				vm.active = index;
			};

			vm.tabs = [
				{
					title: $translate.instant('PATIENT'),
					active: true,
					index : 0,
					type: userTypes.patient,
					form: {
						options: {},
						model: vm.reg,
						fields: regFields.patient()
					}
				},
				{
					title: $translate.instant('DOCTOR'),
					active: false,
					index : 1,
					type: userTypes.doctor,
					form: {
						options: {},
						model: vm.reg,
						fields:regFields.doctor()
					}
				},
				{
					title: $translate.instant('ORGANIZATION'),
					active: false,
					index : 2,
					type: userTypes.org,
					form: {
						options: {},
						model: vm.reg,
						fields:regFields.org()
					}
				}
			];
			getTypes(userTypes.doctor);
			getTypes(userTypes.org);

			function getTypes(type) {

				if (!_.includes([userTypes.doctor, userTypes.org], type))
					return;

				var criteriaDTO = DTO.criteriaDTO();
				criteriaDTO.type = type;

				function insertTypes(index, res) {
					_.each(vm.tabs[index].form.fields, function (field) {
						if ('user.type' === field.key)
							field.templateOptions.options = _.map(res, function (item) {
								item.value = {id: item.id, name: item.name, userType: item.userType};
								return item;
							});
					});
				};

				http.post('/types/all', criteriaDTO)
					.then(function (res) {
						if (userTypes.doctor === type)
							insertTypes(1, res.result)
						else
							insertTypes(2, res.result);
					});

			};

			vm.onSubmit = function () {

				vm.userDTO = DTO.mergeDTO(DTO.userDTO(), vm.reg.user);
				vm.userDTO.userType = vm.tabs[vm.active].type;
				if (userTypes.org === vm.tabs[vm.active].type)
					vm.reg.user.admin = true;

			http.post('/auth/registration',vm.userDTO)
				.then(function (res) {
					if(res.state){
						$state.go('.success');
					}
				});
			};

		});
})();
