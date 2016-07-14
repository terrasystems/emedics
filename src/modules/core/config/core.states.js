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
			name: 'main.public.newpassword.confirm',
			url: '/confirm',
			views: {
				'content@main': {
					templateUrl: 'modules/public/views/confirm.newpassword.html',
					controller: 'confirmNewPasswordCtrl as vm'
				}
			},
			params: {
				key: ''
			}
		},
		{
			name: 'main.public.validationkey',
			url: 'validationkey/:key',
			onEnter: function($stateParams, http, $state) {
				http.get('public/validation_key/' + $stateParams.key)
					.then(function(res) {
						$state.go('main.public.newpassword.confirm', {key: $stateParams.key});
					});
			}
		},
		{
			name: 'main.public.activation',
			url: 'activation/:code',
			onEnter: function($stateParams, http, $state, auth) {
				http.get('public/activate/' + $stateParams.code).then(function(response) {
					console.log(response);
					auth.saveUserData(response);
					$state.go('main.private.dashboard.abstract.catalog', {reload: true});
				});
				console.log($stateParams.code);
			}
		},
		{
			name: 'main.public.signup',
			url: 'signup',
			views: {
				'content@main': {
					templateUrl: 'modules/public/views/signup.html'
				}
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
			name:'main.private.dashboard.abstract.stafs',
			url:'/stuff',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.staf.html',
					controller:'stafCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.stafs.stuffedit',
			url:'/stuffedit',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.stuffEdit.html',
					controller:'stuffEditCtrl as vm'
				}
			},
			params:{
				id: ''
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
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.patTasks.html',
					controller:'patientTasksCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.catalog',
			url:'/catalog',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/Catalog.html',
					controller:'CatalogCtrl as vm'
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
			name:'main.private.dashboard.abstract.settings',
			url:'/settings',
			//parent: 'main.private.dashboard',
			views:{
				'dashboard@content':{
					templateUrl:'modules/dashboard/views/settings.html',
					controller:'settingsCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.drafts',
			url:'/drafts',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.Drafts.html',
					controller:'draftsCtrl as vm'
				}
			}
		},
		{
			name:'main.private.dashboard.abstract.drafts.edit',
			url:'/edit',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.draftEdit.html',
					controller:'draftEditCtrl as vm'
				}
			},
			params:{
				id: ''
			}
		},
		{
			name:'main.private.dashboard.abstract.patients.templates',
			url: '/templates',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/pTemplates.html',
					controller:'pTemplatesCtrl as vm'
				}
			},
			params:{
				id: '',
				name: '',
				email: '',
				phone: ''
			}
		},
		{
			name:'main.private.dashboard.abstract.patients.history',
			url: '/history',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/pHistory.html',
					controller:'pHistoryCtrl as vm'
				}
			},
			params:{
				patient: null,
				obj: null
			}
		},
		{
			name:'main.private.dashboard.abstract.ref.info',
			url:'/info',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.patRefInfo.html',
					controller:'patientRefInfoCtrl as vm'
				}
			},
			params:{
				ref: null
			}
		},
		{
			name:'main.private.dashboard.abstract.stafs.info',
			url:'/info',
			views:{
				'forms@dashboard':{
					templateUrl:'modules/dashboard/views/dashboard.stafInfo.html',
					controller:'stafInfoCtrl as vm'
				}
			},
			params:{
				staf: null
			}
		}

	]);