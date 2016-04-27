angular.module('patient.forms' ,[])
	.controller('patientFormsCtrl',function($state,$filter){

		console.log('i am patient form ctrl');
    var vm=this;
		vm.patientForms=[{
			"id": 0,
			"body": "",
			active:false,
			"name": "Crane",
			"type": "org",
			"descr": "Hello, Crane! You have \"org\" unread messages.",
			"category": "Category 3"
		},
			{
				"id": 1,
				"body": "",
				active:false,
				"name": "Felicia",
				"type": "doc",
				"descr": "Hello, Felicia! You have \"doc\" unread messages.",
				"category": "Category 1"
			},
			{
				"id": 2,
				"body": "",
				active:false,
				"name": "Lorena",
				"type": "pat",
				"descr": "Hello, Lorena! You have \"pat\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 3,
				"body": "",
				active:false,
				"name": "Lindsey",
				"type": "pat",
				"descr": "Hello, Lindsey! You have \"pat\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 4,
				"body": "",
				"name": "Pacheco",
				active:false,
				"type": "pat",
				"descr": "Hello, Pacheco! You have \"pat\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 5,
				"body": "",
				"name": "Tamera",
				active:false,
				"type": "pat",
				"descr": "Hello, Tamera! You have \"pat\" unread messages.",
				"category": "Category 2"
			},
			{
				"id": 6,
				"body": "",
				"name": "Mejia",
				active:false,
				"type": "pat",
				"descr": "Hello, Mejia! You have \"pat\" unread messages.",
				"category": "Category 1"
			},
			{
				"id": 6,
				"body": "",
				"name": "Mejia",
				active:false,
				"type": "pat",
				"descr": "Hello, Mejia! You have \"pat\" unread messages.",
				"category": "Category 1"
			},{
				"id": 6,
				"body": "",
				active:false,
				"name": "Mejia",
				"type": "pat",
				"descr": "Hello, Mejia! You have \"pat\" unread messages.",
				"category": "Category 1"
			},{
				"id": 6,
				"body": "",
				active:false,
				"name": "Mejia",
				"type": "pat",
				"descr": "Hello, Mejia! You have \"pat\" unread messages.",
				"category": "Category 1"
			}];

		vm.save = function () {
			var v= [];
/*			angular.forEach(vm.patientForms, function (curr) {
				if (curr.active) v.push(curr);
			});*/
			$state.go('main.private.dashboard.forms',{activeForms:$filter('filter')(vm.patientForms, {active:true})})


		}
	});
