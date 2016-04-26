(function(){
'use strict';

angular.module('modules.dash', [])

.controller('DashCtrl', function($http, blockUI, alertService)
	{
		console.log('..DashboardCtrl');
		var vm = this;

		//$http.get('/rest/disc', '').success(function (res) {
		//	console.log(JSON.stringify(res,'',4));
		//});
	}

);

	}());
