'use strict';
/*jshint -W117, -W097*/

angular.module('modules.core')

	.constant('constants', {
		restUrl: '/rest/',

		myForms : [
		{name:'Valik',
			number:'1',
			descr:'Doctor Form',
			status:'paid',
			type: 'myForms'
		},
		{name:'Valik',
			number:'2',
			descr:'Patient Form',
			status:'free',
			type: 'myForms'
		},
		{name:'Valik',
			number:'3',
			descr:'Doctor Form',
			status:'paid',
			type: 'myForms'
		},
		{name:'Valik',
			number:'4',
			descr:'Patient Form',
			status:'free',
			type: 'myForms'
		},
		{name:'Valik',
			number:'5',
			descr:'Doctor Form',
			status:'paid',
			type: 'myForms'
		},
		{name:'Valik',
			number:'6',
			descr:'Patient Form',
			status:'free',
			type: 'myForms'
		}
	]

	});