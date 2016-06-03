'use strict';
/*jshint -W117, -W097*/

angular.module('modules.core')

.constant('statesList', [
		{
			name: 'main',
			url: '',
			templateUrl:'modules/core/views/main.html',
			abstract: true
		},
		// public
		{
			name: 'main.public',
			url: '/',
			//templateUrl: 'modules/core/views/main.public.html',
			abstract: true
		},
		{
			name: 'main.public.login',
			url: 'login',
			views: {
				'content@main': {
					templateUrl: 'modules/public/views/login.html',
					controller: 'LoginCtrl as vm'
				}
			}
		},
		{
			name: 'main.public.registration',
			url: 'registration',
			views: {
				'content@main': {
					templateUrl: 'modules/public/views/registration.html',
					controller: 'RegistrationCtrl as vm'
				}
			}
		},
		{
			name: 'main.public.newpassword',
			url: 'newpassword',
			views: {
				'content@main': {
					templateUrl: 'modules/public/views/newpassword.html',
					controller: 'NewPasswordCtrl as vm'
				}
			}
		},
		{
			name: 'main.public.activation',
			url: 'activation/:code',
			onEnter: function($stateParams, http, $state, auth) {
				http.get('public/activate/' + $stateParams.code).then(function(response) {
					console.log(response);
					auth.saveUserData(response);
					$state.go('main.private.dashboard', {reload: true});
				});
				console.log($stateParams.code);
			}
		},
		// private
		{
			name: 'main.private',
			url:'',
			abstract: true,
			parent:'main'
		},
		{
			name:'main.private.dashboard',
			url:'/dashboard',
			abstract:true,
			parent:'main.private',
			views:{
				'content@main':{
					templateUrl:'modules/dashboard/views/dashboard.html',
					controller:'DashCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract',
			abstract:true,
			//parent:'main.private.abstract',
			views:{
				'dashboard@content':{
					templateUrl:'modules/core/views/tabs.html'
					//controller:'DashCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.forms',
			url:'/forms',
			//parent:'main.private.dashboard',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.patForms.html',
					controller:'patientFormsCtrl as vm'
				}
			}
		},
		{
		name:'main.private.dashboard.abstract.patients',
			url:'/patients',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/Patients.html',
					controller:'patientsCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.patients.create',
			url:'/create',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/PatientsAdd.html',
					controller:'patientsAddCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.patients.edit',
			url:'/edit',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.patTasksEdit.html',
					controller:'patientTasksEditCtrl as vm'
				}
			},
			params:{
				id: '',
				type: '',
				patId: null
			}
		},
		{
			name:'main.private.dashboard.abstract.ref',
			url:'/references',
			//parent:'main.private.dashboard',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.patRefs.html',
					controller:'patientReferencesCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.refadd',
			url:'/references/add',
			//parent:'main.private.dashboard',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.patRefsAdd.html',
					controller:'patientReferencesAddCtrl as vm'
				}
			}
		},
		//{
		//	name:'main.private.dashboard.abstract.ref2',
		//	url:'/references2',
		//	views:{
		//		'forms@dashboard':{
		//			templateUrl:'modules/dashboard/views/dashboard.patRefs2.html',
		//			controller:'patientReferences2Ctrl as vm'
		//		}
		//	}
		//},
		{
			name:'main.private.dashboard.abstract.notifications',
			url:'/notifications',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.patNotif.html',
					controller:'patientNotifCtrl as vm'
				}
			}
			//parent: 'main.private.dashboard'
		},
		{
			name:'main.private.dashboard.abstract.tasks',
			url:'/tasks',
			//parent: 'main.private.dashboard',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.patTasks.html',
					controller:'patientTasksCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.myforms',
			url:'/myforms',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/myForms.html',
					controller:'MyFormCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.myforms.template',
			url:'/template',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/FormsTemplate.html',
					controller:'FormTemplateCtrl as vm'
				}
			},
			params:{
				arr: null
			}
		},
		{
			name:'main.private.dashboard.abstract.tasks.edit',
			url:'/edit',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.patTasksEdit.html',
					controller:'patientTasksEditCtrl as vm'
				}
			},
			params:{
				id: '',
				type: '',
				patId: null
			}
		},
		{
			name:'main.private.dashboard.abstract.notifications.addnotification',
			url:'/add',
			params:{
				name:null,
				id:null
			},
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.NotifAdd.html',
					controller:'addNotificationCtrl as vm'

				}
			}
		},
		{
			name:'main.private.dashboard.abstract.settings',
			url:'/settings',
			//parent: 'main.private.dashboard',
			views:{
				'dashboard@content':{
					templateUrl:'modules/dashboard/views/settings.html',
					controller:'settingsCtrl as vm'
				}
			}
		}

	]);

