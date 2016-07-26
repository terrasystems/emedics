(function(){
	"use strict";
	/*jshint -W117, -W097, -W089, -W061*/
	angular.module('modules.public')
		.controller('registrationCtrl', function (regFields, $translate) {
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

			vm.onSubmit = function () {

			};

		});
})();
