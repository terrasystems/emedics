'use strict';

angular.module('modules.patforms', ['ui-listView'])


.controller('DashboardPatFormsCtrl', function($rootScope, $state, $http)  {
		console.log('..DashboardPatFormsCtrl!!!!');
		var vm = this;
    vm.list=[{id:'form',body:'many things to do',name:'',type:'',descr:'you must take a pills',category:'Main recipes'},
	    {id:'form',body:'many things to do',name:'',type:'',descr:'you must take a pills',category:'Main recipes'},
	    {id:'form',body:'many things to do',name:'',type:'',descr:'you must take a pills',category:'Main recipes'},
	    {id:'form',body:'many things to do',name:'',type:'',descr:'you must take a pills',category:'Main recipes'},
	    {id:'form',body:'many things to do',name:'',type:'',descr:'you must take a pills',category:'Main recipes'},
	    {id:'form',body:'many things to do',name:'',type:'',descr:'you must take a pills',category:'Main recipes'},
	    {id:'form',body:'many things to do',name:'',type:'',descr:'you must take a pills',category:'Main recipes'},
	    {id:'form',body:'many things to do',name:'',type:'',descr:'you must take a pills',category:'Main recipes'}];




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
