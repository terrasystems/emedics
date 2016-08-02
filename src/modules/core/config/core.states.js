(function () {
	/*jshint -W117, -W097*/

	angular.module('modules.core')

		.constant('statesList', [
			{
				name: 'main',
				templateUrl: 'modules/core/views/main.html',
				abstract: true,
				url: ''
			},
			// public
			{
				name: 'main.auth',
				abstract: true,
				url: '',
				parent: 'main'
			},
			{
				name: 'main.auth.login'
			},
			{
				name: 'main.auth.registration'
			},
			{
				name: 'main.auth.successregistration'
			},
			{
				name: 'main.auth.forgotpassword'
			},
			{
				name: 'main.auth.resetpassword',
				params: {
					key: null
				}
			},
			{
				name: 'main.auth.validationkey',
				url: '/validationkey/:key',
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
				url: '/activation/:code',
				onEnter: function ($stateParams, auth, $log) {
					auth.activateUser($stateParams.code);
					$log.debug($stateParams.code);
				},
				parent: 'main.auth'
			},
			{
				name: 'main.auth.signup'
			},
			// private zone
			{
				name: 'main.dashboard',
				url:'',
				abstract: true
			},
			{
				name: 'main.dashboard.patients'
			},
			{
				name: 'main.dashboard.patients.editor',
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
				params: {
					id: null,
					name: null,
					email: null,
					phone: null
				}
			},
			{
				name: 'main.dashboard.user.history',
				params: {
					forUser: null,
					obj: null
				}
			},
			{
				name: 'main.dashboard.references'
			},
			{
				name: 'main.dashboard.references.editor'
			},
			{
				name: 'main.dashboard.references.info',
				params: {
					ref: null
				}
			},
			{
				name: 'main.dashboard.staff'
			},
			{
				name: 'main.dashboard.staff.editor',
				params: {
					id: ''
				}
			},
			{
				name: 'main.dashboard.staff.info',
				params: {
					staff: null
				}
			},
			{
				name: 'main.dashboard.notifications'
			},
			{
				name: 'main.dashboard.catalog',
				params: {
					arr: null
				}
			},
			{
				name: 'main.dashboard.tasks'
			},
			{
				name: 'main.dashboard.tasks.editor',
				params: {
					id: null
				}
			},
			{
				name: 'main.dashboard.settings'
			},
			{
				name: 'main.dashboard.drafts'
			},
			{
				name: 'main.dashboard.drafts.editor',
				params: {
					id: ''
				}
			}

		])
})();