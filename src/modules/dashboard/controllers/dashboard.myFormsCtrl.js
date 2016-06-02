'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('MyFormCtrl', function () {
		var vm = this;
		vm.myForms = [
			{name:'Valik',
				number:'1',
				descr:'Doctor Form',
				status:'paid'
			},
			{name:'Valik',
				number:'2',
				descr:'Patient Form',
				status:'free'
			},
			{name:'Valik',
				number:'3',
				descr:'Doctor Form',
				status:'paid'
			},
			{name:'Valik',
				number:'4',
				descr:'Patient Form',
				status:'free'
			},
			{name:'Valik',
				number:'5',
				descr:'Doctor Form',
				status:'paid'
			},
			{name:'Valik',
				number:'6',
				descr:'Patient Form',
				status:'free'
			}
		];
	});