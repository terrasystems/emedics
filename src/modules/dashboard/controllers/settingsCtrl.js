'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('settingsCtrl',function($scope,$state){
		var vm=this;
		vm.InfoChange={
			id:null,
			email:'',
			typeExp:null
		};
vm.onSave=function(){
	vm.InfoChanged={};
	vm.InfoChanged.id=vm.InfoChange.id;
	vm.InfoChanged.email=vm.InfoChange.email;
	vm.InfoChanged.typeExp=vm.InfoChange.typeExp;
	console.log(vm.InfoChanged);
};
	});
