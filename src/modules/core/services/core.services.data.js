'use strict';
/*jshint -W117, -W097, -W089, -W061*/

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
					$rootScope.$broadcast('change.username');
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


//инициализация параметров для $http запроса
	.service('DTO', function () {
		var paramsPOST = {
			page: {
				start: 0,
				count: 20,
				size: 0
			},
			criteria: {
				search: '',
				list: []
			}
		};
		var paramsSend = {
			template: {
				id: null,
				type: null,
				description: null,
				templateDto: null
			},
			patient: null,
			data: "{}"
		};
		return {
			default :  paramsPOST,
			createTask: paramsSend
		};
	})

//работа с базой pouchdb
	.service('pouch_db', function($q, $rootScope, alertService, $translate) {
		function save (base, id, info, model){
			var deferred = $q.defer();
			//if  (id === 'add') {
			//	var doc = {
			//		_id: new Date().toISOString(),
			//		status: 'draft',
			//		draftName: info.name,
			//		body: {sections: model, formInfo: info}
			//	};
			//	base.put(doc, function(res) {
			//		deferred.resolve(res);
			//	});
			//}  else {
				base.get(id).then(function(doc) {
					var x = new Date().toISOString();
					doc.body = {sections: model, formInfo: info, changeDateTime: x };
					console.log('run then: ' +doc.body);
					base.put(doc, function(res) {
						deferred.resolve(res);
					});
					//return doc;
				}, function(res) {
					var x = new Date().toISOString();
					var doc = {
						_id: id,
						status: 'draft',
						draftName: info.name,
						body: {sections: model, formInfo: info, changeDateTime: x}
					};
					base.put(doc, function(res) {
						deferred.resolve(res);
					}, function(error) {
						deferred.reject(error);
					});
				}).catch(function(error) {
					// Do something with the error
				}).finally(function() {
					// Do something when everything is done
					deferred.resolve(true);
				});
			//}
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
	.service('forEditTask', function ($q, http, blockUI, $base64, $translate, pouch_db, $rootScope) {
		var getModelForEdit = function (getUrl, id) {
			var deferred = $q.defer();
			var data = { sections: [], options: [], model: [], sectionsName: [], selectedSection: '', selectedKey: '', editModel: {}, formInfo: {} };

			var convertModel = function() {
				if (!data.model) {
					data.model = [];
					data.sectionsName.forEach(function (item) {
						var it = {};
						it[item] = {};
						data.model.push(it);
					});
				}
				if (data.sectionsName.length > 0) {
					data.selectedSection = data.sectionsName[0];
					for (var key in  data.model) {
						var obj = data.model[key][Object.keys(data.model[key])[0]];
						for (var prop in obj) {
							if (obj.hasOwnProperty(prop) && prop.indexOf('_DATE') > 0 && obj[prop] !== null) {
								obj[prop] = new Date(obj[prop]);
							}
						}
					}
				}
			};

			if  (getUrl==='' && id !==  null) {
				pouch_db.load($rootScope.db, id)
					.then(function(res) {
						data.x = res;
						data.formInfo = res.body.formInfo;
						data.sections = eval($base64.decode(data.formInfo.body.sections));
						data.sections.forEach(function (item) {
							data.sectionsName.push(Object.keys(item)[0]);
						});
						data.model = (res.body && res.body.sections) ? res.body.sections : undefined;
						convertModel();
						deferred.resolve(data);
					}, function() {
						deferred.reject(false);
					});
			} else {
				http.get(getUrl)
					.then(function (res) {
						blockUI.stop();
						data.editModel = res.result;
						if (res.result && res.result.template && res.result.template.body && res.result.template.body.sections && res.result.id) {
							data.formInfo.id = res.result.id;
							data.formInfo.category = res.result.template.category;
							data.formInfo.name = res.result.template.name;
							data.formInfo.number = res.result.template.number;
							data.formInfo.descr = res.result.template.descr;
							data.formInfo.body = res.result.template.body;
							data.formInfo.rawData = data.editModel;

							data.sectionsName = [];
							data.sections = [];
							data.sections = eval($base64.decode(res.result.template.body.sections));
							data.sections.forEach(function (item) {
								data.sectionsName.push(Object.keys(item)[0]);
							});
							data.model = (res.result.data && res.result.data.sections) ? res.result.data.sections : undefined;
							convertModel();
							deferred.resolve(data);
						} else {
							deferred.reject(false);
						}
					}, function() {
						deferred.reject(false);
					});
			}
			return deferred.promise;
		};

		return {
			getModel: getModelForEdit
		};
	});
