'use strict';

angular.module('modules.patforms', ['ui-listView'])


.controller('DashboardPatFormsCtrl', function($rootScope, $state, $http,constants,$stateParams)  {
		console.log('..DashboardPatFormsCtrl!!!!');
		var vm = this;
    vm.list=constants.listTasks;
    vm.list =$stateParams.activeForms;
		//
		//$http.post('rest/dashboard/forms/active', {first:1,count:20}).then(function (resp) {
		//	vm.list = resp.data.list;
		//});
		//
		//
		//
		//

	}

);
