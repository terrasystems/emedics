'use strict';

angular.module('modules.patforms', ['ui-listView'])


.controller('DashboardPatFormsCtrl', function($rootScope, $state, $http,constants)  {
		console.log('..DashboardPatFormsCtrl!!!!');
		var vm = this;
    vm.list=constants.listTasks;

		//
		//$http.post('rest/dashboard/forms/active', {first:1,count:20}).then(function (resp) {
		//	vm.list = resp.data.list;
		//});
		//
		//
		//
		//



		//"list":[
		//	{"id":long,
		//		"body":string,
		//		"name":string,
		//		"type":string,
		//		"descr":string,
		//		"category":string
		//	},
		//],
		//	"page":{"start":long,
		//	"count":long,
		//	"size":long}
	}

);
