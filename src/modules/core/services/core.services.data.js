'use strict';

angular.module('modules.core')
// insert
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
	});