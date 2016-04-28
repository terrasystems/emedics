'use strict';
/*jshint	-W117*/

angular.module('modules.pattasks', ['ui-listView'])

	.controller('patientTasksCtrl', function ($rootScope, $state, $http, constants, $stateParams) {
		console.log('..patientTasksCtrl');
		var vm = this;
		vm.list = $stateParams.activeForms;
		//
		//$http.post('rest/dashboard/forms/active', {first:1,count:20}).then(function (resp) {
		//	vm.list = resp.data.list;
		//});
	}
);
