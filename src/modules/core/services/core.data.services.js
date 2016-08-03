(function () {
	/*jshint -W117, -W097, -W089, -W061*/

	angular.module('modules.core')

		.service('confirmService', function ($q, $confirm, $translate) {
			return function (text) {
				var deferred = $q.defer();
				$confirm({
					text: $translate.instant(text)
				}, {
					templateUrl: 'modules/core/views/modalconfirm.tmpl.html'
				}).then(function () {
					deferred.resolve(true);
				}, function () {
					deferred.reject(false);
				});
				return deferred.promise;
			};
		})

		.service('alertService', function (toastr) {
			return {
				success: function (msg, titleText, msgParam) {
					if (msg || titleText) {

						toastr.success(msg, titleText, msgParam);
					}
				},
				warning: function (msg, titleText, msgParam) {
					if (msg || titleText) {

						toastr.warning(msg, titleText, msgParam);
					}
				},
				error: function (msg, titleText, msgParam) {
					if (msg || titleText) {
						toastr.error(msg, titleText, msgParam);
					}
				},
				info: function (msg, titleText, msgParam) {
					if (msg || titleText) {
						toastr.info(msg, titleText, msgParam);
					}
				}
			};
		})
		//
		.service('http', function ($http, $q, constants, alertService, $translate) {
			//Call if all good
			function successListener(resp, deferred) {
				if (resp.data.msg) {
					resp.data.msg = $translate.instant(resp.data.msg);
				}
				if (resp.data && resp.data.state) {
					deferred.resolve(resp.data);
				}
				else {
					deferred.reject(false);
					alertService.warning($translate.instant(resp.data.msg ? resp.data.msg : 'MSG_NO_DATA'));
				}
			}

			//Call if error
			function errorListener(error, deferred) {
				deferred.reject(error);
				if (error.status === '401') {
					alertService.error($translate.instant(error.data.state.message));
				}
				else {
					alertService.error(error.status + ' ' + error.statusText);
				}
			}

			//Function wrapper on $http service
			function H(url, params, method) {
				var deferred = $q.defer();
				$http[method](constants.restUrl + url, params).then(function (resp) {
						successListener(resp, deferred);
					},
					function (error) {
						errorListener(error, deferred);
					});
				return deferred.promise;
			}

			return {
				get: function (url, params) {
					return H(url, params, 'get');
				},
				post: function (url, params) {
					return H(url, params, 'post');
				}
			};
		})

//init data transfer objects to sent to server
		.factory('DTO', function (constants) {

			return {
				mergeDTO: mergeDTO,
				criteriaDTO: criteriaDTO,
				referencesDTO: referencesDTO,
				staffDTO: staffDTO,
				tasksCriteriaDTO: tasksCriteriaDTO,
				taskDTO: taskDTO,
				patientsDTO: patientsDTO,
				catalogFilter: catalogFilter,
				userDTO: userDTO,
				loginDTO: loginDTO,
				changePassDTO: changePassDTO
			};

			//region <body>
			function criteriaDTO() {
				return {
					search: '',
					start: 0,
					count: constants.pagination,
					type: null
				};
			}

			function referencesDTO() {
				return {
					id: null,
					name: null,
					firstName: null,
					lastName: null,
					userType: null,
					dob: null,
					type: null,
					email: null,
					active: null
				};
			}

			function staffDTO() {
				return {
					id: null,
					name: null,
					firstName: null,
					lastName: null,
					dob: null,
					email: null,
					address: null,
					phone: null
				};

			}

			function taskDTO() {
				return {
					id: null,
					fromUser: null,
					toUser: null,
					descr: null,
					template: null,
					patient: null,
					date: null,
					status: null,
					model: null,
					_id: null,
					_rev: null,
					_type: null
				};

			}

			function tasksCriteriaDTO() {
				return {
					period: 1,
					templateName: null,
					patientName: null,
					fromName: null,
					status: null
				};
			}

			function patientsDTO() {
				return {
					id: null,
					name: null,
					firstName: null,
					lastName: null,
					phone: null,
					email: null
				};
			}

			function catalogFilter() {
				return {all: true, paid: true, free: true, patient: true, med: true, search: ''};
			};

			function userDTO() {
				return {
					id: null,
					userType: null,
					type: null,
					name: null,
					firstName: null,
					lastName: null,
					pass: null,
					dob: null,
					email: null,
					phone: null,
					address: null,
					orgName: null,
					website: null,
					admin: false
				};

			};

			function mergeDTO(object, other) {

				function customizer(objValue, srcValue) {
					if (_.isArray(objValue)) {
						return objValue.concat(srcValue);
					} else if (srcValue) {
						objValue = srcValue
						return objValue;
					}
				};
				return _.mergeWith(object, other, customizer);
			};
			function loginDTO() {
				return {
					email: null,
					password: null
				}
			};

			function changePassDTO() {
				return {
					oldPass: null,
					newPass: null
				}
			};
			//endregion

		})

//работа с базой pouchdb
		.service('pouch_db', function ($q, $log) {
			function save(base, id, info, model) {
				var deferred = $q.defer();
				base.get(id).then(function (doc) {
					var x = new Date().toISOString();
					doc.body = {sections: model, formInfo: info, changeDateTime: x};
					$log.debug('run then: ' + doc.body);
					base.put(doc, function (res) {
						deferred.resolve(res);
					});
					//return doc;
				}, function () {
					var x = new Date().toISOString();
					var doc = {
						_id: id,
						status: 'draft',
						draftName: info.name,
						body: {sections: model, formInfo: info, changeDateTime: x}
					};
					base.put(doc, function (res) {
						deferred.resolve(res);
					}, function (error) {
						deferred.reject(error);
					});
				}).catch(function (error) {
					// Do something with the error
				}).finally(function () {
					// Do something when everything is done
					deferred.resolve(true);
				});
				//}
				return deferred.promise;
			}

			function load_all(base, scope) {
				var deferred = $q.defer();
				base.allDocs({include_docs: true, descending: true}, function (err, doc) {
					scope.$apply(function () {
						deferred.resolve(doc);
					});
				});
				return deferred.promise;
			}

			function load(base, id) {
				var deferred = $q.defer();
				base.get(id).then(function (doc) {
					deferred.resolve(doc);
				}, function () {
					deferred.reject(false);
				});
				return deferred.promise;
			}

			function del(base, id) {
				var deferred = $q.defer();
				base.get(id).then(function (doc) {
					return base.remove(doc);
				}, function () {
					deferred.reject(false);
				}).then(function (resp) {
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
	/*	.service('forEditTask', function ($q, http, blockUI, $base64, $translate, pouch_db, $rootScope) {
	 var getModelForEdit = function (getUrl, id) {
	 var deferred = $q.defer();
	 var data = {
	 sections: [],
	 options: [],
	 model: [],
	 sectionsName: [],
	 selectedSection: '',
	 selectedKey: '',
	 editModel: {},
	 formInfo: {}
	 };

	 var convertModel = function () {
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

	 if (getUrl === '' && id !== null) {
	 pouch_db.load($rootScope.db, id)
	 .then(function (res) {
	 data.x = res;
	 data.formInfo = res.body.formInfo;
	 data.sections = eval($base64.decode(data.formInfo.body.sections));
	 data.sections.forEach(function (item) {
	 data.sectionsName.push(Object.keys(item)[0]);
	 });
	 data.model = (res.body && res.body.sections) ? res.body.sections : undefined;
	 convertModel();
	 deferred.resolve(data);
	 }, function () {
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
	 }, function () {
	 deferred.reject(false);
	 });
	 }
	 return deferred.promise;
	 };

	 return {
	 getModel: getModelForEdit
	 };
	 })*/
})();
