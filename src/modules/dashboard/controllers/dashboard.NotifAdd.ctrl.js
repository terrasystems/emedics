'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')
	.controller('addNotificationCtrl', function ($scope) {
		console.log('addNotificationCtrl is working');
		var vm = this;

		//vm.onApply = function(obj) {
		//	if  (vm.selectID && vm.selectID!==null){
		//		console.log('!! '+vm.selectID);
		//	}
		//};
		//
		//vm.onSetSelect = function(obj) {
		//	console.log('%% '+obj);
		//	vm.selectID = obj.id;
		//};
		vm.title='';
		vm.send=function(){
			vm.obj={'title':''};
			vm.obj.push(vm.title);
			console.log('sent' + vm.obj);
		};


		$scope.$watch('doctor.selected', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				if (vm.doctors.indexOf(newVal) === -1) {
					vm.doctors.unshift(newVal);
				}
			}
		});

		vm.getDoctors = function(search) {
			vm.newDocs = vm.doctors.slice();
			if (search && vm.newDocs.indexOf(search) === -1) {
				vm.newDocs.unshift(search);
			}
			return vm.newDocs;
		};

		$scope.$watch('form.selected', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				if (vm.forms.indexOf(newVal) === -1) {
					vm.forms.unshift(newVal);
				}
			}
		});

		vm.getForms = function(search) {
			vm.newForms = vm.forms.slice();
			if (search && vm.newForms.indexOf(search) === -1) {
				vm.newForms.unshift(search);
			}
			return vm.newForms;
		};


		vm.forms = [
			{
				'id':1,
				'name':'Form First'
			},
			{	'id': 2,
				'name':'Form Second'


			},
			{	'id': 3,
				'name':'Form Third'

			},
			{	'id': 4,
				'name':'Form Fourth'


			},
			{	'id': 5,
				'name':'Form Fifth'

			}
		].sort();

		vm.doctors = [
			{
				'id': 12,
				"name": "Petya",
				'tel':89879879879,
				"city": "Khmelnitsky"
			},
			{	'id': 130,
				"name": "Vitya",
				"tel": 1456364,
				"city": "Khmelnitsky"
			},
			{	'id': 222,
				"name": "Andrew",
				"tel": 26576757,
				"city": "Khmelnitsky"
			},
			{	'id': 602,
				"name": "Anton",
				"tel": 233,
				"city": "Khmelnitsky"

			},
			{	'id': 1,
				"name": "Misha",
				"tel": 434435,
				"city": "Khmelnitsky"
			}
		].sort();
	}
);
