(function () {
	/*jshint -W117, -W097, -W089, -W061*/

	angular.module('modules.core')
		.service('confirmService', confirmService)
		.service('alertService', alertService)
		.service('http', http)
		.factory('DTO', DTO);

	//body
	function confirmService ($q, $confirm, $translate) {
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
	};

	function alertService (toastr) {
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
	};

	function http ($http, $q, constants, alertService, $translate) {
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
	};

	//init data transfer objects to sent to server
	function DTO (constants) {

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
				_id: null,
				id: null,
				fromUser: null,
				toUser: null,
				descr: null,
				template: null,
				patient: null,
				date: null,
				status: null,
				model: null,
				type: null
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
			return {commerce:[{key:'all',value:'all'},{key:'paid',value:true}, {key:'free',value:false}],
			type:[{key:'all',value:'all'},{key:'patient',value: 'PATIENT'}, {key:'medical',value: 'MEDICAL'}], search: null};
		}

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

	};
})();
