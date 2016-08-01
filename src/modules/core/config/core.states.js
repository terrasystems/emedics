(function () {
	/*jshint -W117, -W097*/

	angular.module('modules.core')

		.constant('statesList', [
			{
				name: 'main',
				url: '',
				templateUrl: 'modules/core/views/main.html',
				abstract: true
			},
			// public
			{
				name: 'main.auth',
				url: '/',
				//templateUrl: 'modules/core/views/main.public.html',
				abstract: true,
				parent: 'main'
			},
			{
				name: 'main.auth.login',
				url: 'login',
				views: {
					'content@main': {
						templateUrl: 'modules/auth/login/views/login.html',
						controller: 'loginCtrl as vm'
					}
				},
				parent: 'main.auth'
			},
			{
				name: 'main.auth.registration',
				url: 'registration',
				views: {
					'content@main': {
						templateUrl: 'modules/auth/registration/views/registration.html',
						controller: 'registrationCtrl as vm'
					}
				},
				parent: 'main.auth'
			},
			{
				name: 'main.auth.registration.success',
				url: 'success_registration',
				views: {
					'content@main': {
						templateUrl: 'modules/auth/registration/views/registration.success.html'
					}
				},
				parent: 'main.auth.registration'
			},
			{
				name: 'main.auth.forgotpassword',
				url: 'forgotpassword',
				views: {
					'content@main': {
						templateUrl: 'modules/auth/forgotpassword/views/forgotpassword.html',
						controller: 'forgotpasswordCtrl as vm'
					}
				},
				parent: 'main.auth'
			},
			{
				name: 'main.auth.resetpassword',
				url: '/resetpassword',
				views: {
					'content@main': {
						templateUrl: 'modules/auth/resetpassword/views/resetpassword.html',
						controller: 'resetpasswordCtrl as vm'
					},
					parent: 'main.auth'
				},
				params: {
					key: null
				}
			},
			{
				name: 'main.auth.validationkey',
				url: 'validationkey/:key',
				onEnter: function ($stateParams, http, $state, $log) {
					http.get('/auth/check_key/' + $stateParams.key)
						.then(function () {
							$state.go('main.auth.resetpassword', $stateParams);
						}, function (error) {
							$log.debug(error);
							$state.go('main.auth.login');
						});
				},
				parent: 'main.auth'
			},
			{
				name: 'main.auth.activation',
				url: 'activation/:code',
				onEnter: function ($stateParams, auth, $log) {
					auth.activateUser($stateParams.code);
					$log.debug($stateParams.code);
				},
				parent: 'main.auth'
			},
			{
				name: 'main.auth.signup',
				url: 'signup',
				views: {
					'content@main': {
						templateUrl: 'modules/auth/signup/views/signup.html'
					}
				},
				parent: 'main.auth'
			},
			// private zone
			{
				name: 'main.dashboard',
				url: '/dashboard',
				abstract: true,
				parent: 'main',
				views: {
					'content@main': {
						templateUrl: 'modules/dashboard/views/dashboard.html',
						controller: 'DashCtrl as vm'
					}
				}
			},
			{
				name: 'main.dashboard.patients',
				url: '/patients',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/patients/views/patients.html',
						controller: 'patientsCtrl as vm'
					}
				},
				parent: 'main.dashboard'
			},
			{
				name: 'main.dashboard.patients.editor',
				url: '/editor',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/patients/views/' +
						'.editor.html',
						controller: 'patientsEditorCtrl as vm'
					}
				},
				parent: 'main.dashboard',
				params: {
					id: '',
					type: '',
					patId: null
				}
			},
			{
				name: 'main.dashboard.user',
				url: '',
				abstract: true
			},
			{
				name: 'main.dashboard.user.templates',
				url: '/templates',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/user/views/templates.html',
						controller: 'userTemplatesCtrl as vm'
					}
				},
				parent: 'main.dashboard.user',
				params: {
					id: null,
					name: null,
					email: null,
					phone: null
				}
			},
			{
				name: 'main.dashboard.user.history',
				url: '/history',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/user/views/history.html',
						controller: 'userHistoryCtrl as vm'
					}
				},
				parent: 'main.dashboard.user',
				params: {
					forUser: null,
					obj: null
				}
			},
			{
				name: 'main.dashboard.references',
				url: '/references',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/references/views/references.html',
						controller: 'referencesCtrl as vm'
					}
				},
				parent: 'main.dashboard'
			},
			{
				name: 'main.dashboard.references.editor',
				url: '/add',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/references/views/references.editor.html',
						controller: 'referencesEditorCtrl as vm'
					}
				},
				parent: 'main.dashboard.references'
			},
			{
				name: 'main.dashboard.references.info',
				url: '/info',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/references/views/references.info.html',
						controller: 'referencesInfoCtrl as vm'
					}
				},
				parent: 'main.dashboard.references',
				params: {
					ref: null
				}
			},
			{
				name: 'main.dashboard.staff',
				url: '/staff',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/staff/views/staff.html',
						controller: 'staffCtrl as vm'
					}
				},
				parent: 'main.dashboard'
			},
			{
				name: 'main.dashboard.staff.editor',
				url: '/editor',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/staff/views/staff.editor.html',
						controller: 'staffEditorCtrl as vm'
					}
				},
				parent: 'main.dashboard.staff',
				params: {
					id: ''
				}
			},
			{
				name: 'main.dashboard.staff.info',
				url: '/info',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/staff/views/staff.info.html',
						controller: 'staffInfoCtrl as vm'
					}
				},
				parent: 'main.dashboard.staff',
				params: {
					staff: null
				}
			},
			{
				name: 'main.dashboard.notifications',
				url: '/notifications',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/notifications/views/notifications.html',
						controller: 'notificationsCtrl as vm'

					}
				},
				parent: 'main.dashboard'
			},
			{
				name: 'main.dashboard.tasks',
				url: '/tasks',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/tasks/views/tasks.html',
						controller: 'tasksCtrl as vm'
					}
				},
				parent: 'main.dashboard'
			},
			{
				name: 'main.dashboard.catalog',
				url: '/catalog',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/catalog/views/catalog.html',
						controller: 'catalogCtrl as vm'
					}
				},
				parent: 'main.dashboard',
				params: {
					arr: null
				}
			},
			{
				name: 'main.dashboard.tasks.edit',
				url: '/edit',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/tasks/views/tasks.edit.html',
						controller: 'tasksEditCtrl as vm'
					}
				},
				parent: 'main.dashboard.tasks',
				params: {
					id: null
				}
			},
			{
				name: 'main.dashboard.settings',
				url: '/settings',
				//parent: 'main.dashboard',
				views: {
					'dashboard@content': {
						templateUrl: 'modules/dashboard/settings/views/settings.html',
						controller: 'settingsCtrl as vm'
					}
				},
				parent: 'main.dashboard'
			},
			{
				name: 'main.dashboard.drafts',
				url: '/drafts',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/drafts/views/drafts.html',
						controller: 'draftsCtrl as vm'
					}
				},
				parent: 'main.dashboard'
			},
			{
				name: 'main.dashboard.drafts.edit',
				url: '/edit',
				views: {
					'forms@dashboard': {
						templateUrl: 'modules/dashboard/drafts/views/draftEdit.html',
						controller: 'draftEditCtrl as vm'
					},
					parent: 'main.dashboard.drafts'
				},
				params: {
					id: ''
				}
			}

		])
})();