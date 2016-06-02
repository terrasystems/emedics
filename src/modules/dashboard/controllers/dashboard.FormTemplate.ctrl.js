'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

.controller('FormTemplateCtrl', function (http, blockUI, alertService) {
	var vm = this;
	console.log('FormTemplateCtrl');

	vm.FormTemplate = [
		{
				name:'Form 1',
				number:'1',
				descr:'Admin Form',
				status:'free',
				type: 'myForms'
			},
			{
				name:'Form 2',
				number:'2',
				descr:'Admin Form',
				status:'paid',
				type: 'myForms'
			},
			{
				name:'Form 3',
				number:'3',
				descr:'Admin Form',
				status:'free',
				type: 'myForms'
			},
			{
				name:'Form 4',
				number:'4',
				descr:'Admin Form',
				status:'paid',
				type: 'myForms'
			},
			{
				name:'Form 5',
				number:'5',
				descr:'Admin Form',
				status:'free',
				type: 'myForms'
			},
			{
				name:'Form 6',
				number:'6',
				descr:'Admin Form',
				status:'paid',
				type: 'myForms'
			},
			{
				name:'Form 7',
				number:'6',
				descr:'Admin Form',
				status:'free',
				type: 'myForms'
			}
		];

	});