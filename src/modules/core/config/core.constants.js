'use strict';
/*jshint -W117, -W097*/

angular.module('modules.core')

	.constant('constants', {
		restUrl: '/rest/',

		myForms : [
		{   id : '20001',
			name:'Form #1',
			number:'1',
			descr:'Doctor Form',
			status:'paid',
			type: 'myForms'
		},
		{   id : '20002',
			name:'Form #2',
			number:'2',
			descr:'Patient Form',
			status:'free',
			type: 'myForms'
		},
		{   id : '20003',
			name:'Form #3',
			number:'3',
			descr:'Doctor Form',
			status:'paid',
			type: 'myForms'
		},
		{   id : '20004',
			name:'Form #4',
			number:'4',
			descr:'Patient Form',
			status:'free',
			type: 'myForms'
		},
		{   id : '20005',
			name:'Form #5',
			number:'5',
			descr:'Doctor Form',
			status:'paid',
			type: 'myForms'
		},
		{	id : '20010',
			name:'Form #10',
			number:'10',
			descr:'Patient Form',
			status:'free',
			type: 'myForms'
		}
	],

		formTemplate : [
		{	id: 5001,
			name:'Form 1',
			number:'1',
			descr:'Admin Form',
			status:'free',
			type: 'myForms'
		},
		{	id: 5002,
			name:'Form 2',
			number:'2',
			descr:'Admin Form',
			status:'paid',
			type: 'myForms'
		},
		{	id: 5003,
			name:'Form 3',
			number:'3',
			descr:'Admin Form',
			status:'free',
			type: 'myForms'
		},
		{	id: 5004,
			name:'Form 4',
			number:'4',
			descr:'Admin Form',
			status:'paid',
			type: 'myForms'
		},
		{	id: 5005,
			name:'Form 5',
			number:'5',
			descr:'Admin Form',
			status:'free',
			type: 'myForms'
		},
		{	id: 5006,
			name:'Form 6',
			number:'6',
			descr:'Admin Form',
			status:'paid',
			type: 'myForms'
		},
		{	id: 5007,
			name:'Form 7',
			number:'7',
			descr:'Admin Form',
			status:'free',
			type: 'myForms'
		}
		]

	});