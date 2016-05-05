'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')
	.run(function(editableOptions) {
	editableOptions.theme = 'bs3';
})



	.controller('patientReferencesCtrl', function ($state, $scope, $filter, $http) {
		console.log('..patientReferencesCtrl');

		var vm = this;


		vm.references = [{name: 'Klod', type: 'Walkin0', phone: '8 555 896-45-55'},
			{name: 'Klod', type: 'Walkin1', phone: '8 500 596-45-56'},
			{name: 'Dod', type: 'Walkin2', phone: '8 545 896-45-53'},
			{name: 'Slay', type: 'Walkin3', phone: '8 544 896-45-51'},
			{name: 'Koddy', type: 'Walkin4', phone: '8 566 896-45-50'}];

		vm.removeUser = function(index) {
			vm.references.splice(index, 1);
		};

		vm.addFormList = function() {
			vm.inserted = {
				name:'',
				type: '',
				phone: ''
			};
			vm.references.push(vm.inserted);
		};



	}

);


