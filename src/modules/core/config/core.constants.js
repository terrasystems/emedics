'use strict';
/*jshint -W117, -W097*/

angular.module('modules.core')

	.constant('constants', {
		restUrl: '/api/v2',
		pagination:10

	})
	.constant('userTypes', {
		patient: 'PATIENT',
		doctor: 'DOCTOR',
		staff: 'STAFF',
		org: 'ORG'
	});