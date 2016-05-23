'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('patientsCtrl', function(){
		 var vm = this;
		console.log('patientsCtrl !!!!!');

		 vm.patients=[{
			  FormName:'F1',
			 id:'!!!',
			 name:'Petya',
			 number:'1'
		 },{
			 FormName:'F1',
			 id:'!!!',
			 name:'Igor',
			 number:'1'
		 },
			 {
				 FormName:'F1',
				 id:'!!!',
				 name:'Vasya',
				 number:'1'
			 },
			 {
				 FormName:'F1',
				 id:'!!!',
				 name:'Vasya',
				 number:'1'
			 },
			 {
				 FormName:'F1',
				 id:'!!!',
				 name:'Vasya',
				 number:'1'
			 },
			 {
				 FormName:'F1',
				 id:'!!!',
				 name:'Vasya',
				 number:'1'
			 }];
	});
