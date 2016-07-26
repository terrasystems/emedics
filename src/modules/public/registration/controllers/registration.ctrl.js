(function(){
	"use strict";
	/*jshint -W117, -W097, -W089, -W061*/
	angular.module('modules.public')
		.controller('registrationCtrl', function (regFields, $translate, DTO, http) {
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
					type: 'pat',
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
					type: 'doc',
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
					type: 'org',
					form: {
						options: {},
						model: vm.reg,
						fields:regFields.org()
					}
				}
			];
			getTypes('doc');
			getTypes('org');

			function getTypes(type) {

				if (!_.includes(['doc', 'org'], type))
					return;

				var criteriaDTO = DTO.criteriaDTO();
				criteriaDTO.type = type;

				function insertTypes(index, type, res) {
					_.each(vm.tabs[index].form.fields, function (field) {
						if ('user.' + type + 'type' === field.key)
							field.templateOptions.options = res;
					});
				};

				http.post('/type/all', criteriaDTO)
					.then(function (res) {
						if ('doc' === type)
							insertTypes(1, type, res.result)
						else
							insertTypes(2, type, res.result);
					});
			};

			vm.onSubmit = function () {

				vm.userDTO = DTO.mergeDTO(DTO.userDTO(), vm.reg[vm.tabs[vm.active].type].user);
				vm.userDTO.userType = vm.tabs[vm.active].type;
				if ('org'=== vm.tabs[vm.active].type)
					vm.reg[vm.tabs[vm.active].type].user.isAdmin = true;

			http.post('',vm.userDTO).then()
			};

		});
})();
