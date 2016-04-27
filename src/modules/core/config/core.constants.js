'use strict';

angular.module('modules.core')

.constant('constants', {
	restUrl : '/rest/',
		listTasks : [  {
			"id": 0,
			"body": "",
			"name": "Crane",
			"type": "org",
			"descr": "Hello, Crane! You have \"org\" unread messages.",
			"category": "Category 3"
		},
			{
				"id": 1,
				"body": "",
				"name": "Felicia",
				"type": "doc",
				"descr": "Hello, Felicia! You have \"doc\" unread messages.",
				"category": "Category 1"
			},
			{
				"id": 2,
				"body": "",
				"name": "Lorena",
				"type": "pat",
				"descr": "Hello, Lorena! You have \"pat\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 3,
				"body": "",
				"name": "Lindsey",
				"type": "pat",
				"descr": "Hello, Lindsey! You have \"pat\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 4,
				"body": "",
				"name": "Pacheco",
				"type": "pat",
				"descr": "Hello, Pacheco! You have \"pat\" unread messages.",
				"category": "Category 3"
			},
			{
				"id": 5,
				"body": "",
				"name": "Tamera",
				"type": "pat",
				"descr": "Hello, Tamera! You have \"pat\" unread messages.",
				"category": "Category 2"
			},
			{
				"id": 6,
				"body": "",
				"name": "Mejia",
				"type": "pat",
				"descr": "Hello, Mejia! You have \"pat\" unread messages.",
				"category": "Category 1"
			}]

});