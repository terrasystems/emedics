(function () {
	/*jshint -W117, -W097*/

	angular.module('modules.core')

		.constant('constants', {
			restUrl: '/api/v2',
			pagination: 10

		})
		.constant('userTypes', {
			patient: 'PATIENT',
			doctor: 'DOCTOR',
			staff: 'STAFF',
			org: 'ORG'
		})
		.constant('designDoc', {
			_id: '_design/index',
			views: {
				docType: {
					map: function (doc) {
						if (doc.type) {
							emit(doc.type);
						}
					}.toString()
				},
				docUserType: {
					map: function (doc) {
						if (('reference' === doc.type) && doc.userType) {
							emit(doc.userType);
						}
					}.toString()
				}
			}
		});
})();