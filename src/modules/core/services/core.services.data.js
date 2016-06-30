'use strict';
/*jshint -W117, -W097*/

angular.module('modules.core')

	.service('confirmService', function($q, $confirm, $translate){
		return function(text){
			var deferred = $q.defer();
			$confirm({
				text: $translate.instant(text)
			}, {
				templateUrl: 'modules/core/views/modalconfirm.tmpl.html'
			}).then(function () {
				deferred.resolve(true);
			}, function(){
				deferred.reject(false);
			});
			return deferred.promise;
		};
	})

	.service('alertService', function ($rootScope, toastr) {
		var alertService = {};
		alertService.add = function (type, titleText, msg, msgParam) {
			switch (type) {
				case 0:
					type = 'success';
					toastr.success(msg, titleText, msgParam);
					break;
				case 1:
					type = 'warning';
					toastr.warning(msg, titleText, msgParam);
					break;
				case 2:
					type = 'danger';
					toastr.error(msg, titleText, msgParam);
					break;
				default:
					type = 'info';
					toastr.info(msg, titleText, msgParam);
					break;
			}
		};
		return alertService;
	})

	.service('auth', function($rootScope, localStorageService){
		return {
			saveUserData: function (data) {
				if (data.token) {
					$rootScope.token = data.token;
					localStorageService.set('token', data.token);
				}
				if (data.user) {
					$rootScope.userData = data.user;
					localStorageService.set('userData', data.user);
				}
			}
		};
	})

	.service('http', function($http, $q, constants, alertService, $translate) {
		function get (url, filter){
			var deferred = $q.defer();
			$http.get(constants.restUrl + url, filter).then(function (resp) {
				resp.data.state.message = $translate.instant(resp.data.state.message);
				if  (resp.data && resp.data.state) {
					if  (resp.data.state.value===true) {
						deferred.resolve(resp.data);
					}
					else {
						deferred.reject(false);
						alertService.add(2, resp.data.state.message);
					}
				}
				else {
					deferred.reject(false);
					alertService.add(2, $translate.instant(MSG_NO_DATA));
				}
			}, function (error) {
				deferred.reject(error);
				if  (error.status == '401') {
					alertService.add(2, $translate.instant(error.data.state.message));
				}
				else {
					alertService.add(2, error.status + ' ' + error.statusText);
				}
			});
			return deferred.promise;
		}

		function post (url, params) {
			//console.log('post: '+ url);
			var deferred = $q.defer();
			$http.post(constants.restUrl + url, params).then(function (resp) {
				resp.data.state.message = $translate.instant(resp.data.state.message);
				if  (resp.data && resp.data.state) {
					if  (resp.data.state.value===true) {
						deferred.resolve(resp.data);
					}
					else {
						deferred.reject(false);
						alertService.add(2, resp.data.state.message);
					}
				}
				else {
					deferred.reject(false);
					alertService.add(2, $translate.instant(MSG_NO_DATA));
				}
			}, function (error) {
				deferred.reject(error);
				if  (error.status == '401') {
					alertService.add(2, $translate.instant(error.data.state.message));
				}
				else {
					alertService.add(2, error.status + ' ' + error.statusText);
				}
			});
			return deferred.promise;
		}

		//******
		return {
			get: get,
			post: post
		};
	})


// Интерцептор для перехвата ошибок
	.service('responseErrorInterceptor', function ($rootScope, $q, $injector, blockUI) {
		return {
			'response': function (response) {
				//console.log('int.responce: '+response);
				return response;
			},
			'responseError': function (rejection) {
				//console.log('int.rejection: ' + rejection);

				blockUI.reset();

				switch (rejection.status) {
					case 401:
					{
						$injector.get('$state').go('main.public.login',{reload: true});
						break;
					}
					case 404:
					{
						//$injector.get('$state').go('main.public.login',{reload: true});
						break;
					}
					default:
					{
						//console.log(rejection);
						break;
					}
				}
				return $q.reject(rejection);
			}
		};
	})


	.service('checkUserAuth', function ($location, localStorageService, $rootScope) {
		var checkUserAuth = function () {
			var originalPath = $location.path();
			$location.path('/login');
			var authToken = localStorageService.get('token');
			if ((authToken !== undefined) && (authToken !== null)) {
				$rootScope.token = authToken;
				$rootScope.userData = localStorageService.get('userData');
				$location.path(originalPath);
				return;
			}
		};
		return checkUserAuth;
	})


//Сервис интерцептора запроса, вставляет токен в хедер
	.service('requestInterceptor', function ($rootScope, $q) {
		return {
			'request': function (config) {
				if ($rootScope.token) {
					var authToken = $rootScope.token;
					config.headers['X-Auth-Token'] = authToken;
				}
				return config || $q.when(config);
			}
		};
	})

//инициализация параметров для $http запроса
	.service('initParamsPOST', function () {
		var paramsPOST = {
			"page": {
				"start": 0,
				"count": 20,
				"size": 0
			},
			"criteria": {
				"search": '',
				"list": []
			}
		};
		return {
			'params' :  paramsPOST
		};
	})

//работа с базой pouchdb
	.service('pouch_db', function($q, $rootScope, alertService, $translate) {
		function save (base, id, info, model){
			var deferred = $q.defer();
			var doc = {
				_id: (id === 'add') ? new Date().toISOString() : id,
				status:	'draft',
				draftName: info,
				body: { sections: model }
			};
			base.put(doc, function(res) {
				deferred.resolve(res);
			});
			return deferred.promise;
		}

		function load_all (base, scope) {
			var deferred = $q.defer();
			base.allDocs({include_docs: true, descending: true}, function(err, doc) {
				scope.$apply(function(){
					deferred.resolve(doc);
				});
			});
			return deferred.promise;
		}

		function load (base, id) {
			var deferred = $q.defer();
			base.get(id).then(function(doc) {
				deferred.resolve(doc);
			}, function() {
				deferred.reject(false);
			});
			return deferred.promise;
		}

		function del (base, id) {
			var deferred = $q.defer();
			base.get(id).then(function(doc) {
				return base.remove(doc);
			}, function() {
				deferred.reject(false);
			}).then(function(resp) {
				deferred.resolve(resp);
			});
			return deferred.promise;
		}
		//******
		return {
			save: save,
			load: load,
			load_all: load_all,
			del: del
		};
	})

//
	.service('getModelForEdit', function () {
		var getModelForEdit = function (id) {
			//var originalPath = $location.path();
			//$location.path('/login');
			//var authToken = localStorageService.get('token');
			//if ((authToken !== undefined) && (authToken !== null)) {
			//	$rootScope.token = authToken;
			//	$rootScope.userData = localStorageService.get('userData');
			//	$location.path(originalPath);
			//	return;
			//}
		};
		return getModelForEdit;
	});
