'use strict';

// describe('Catalog Controller', function() {
// 	var controller, http, scope;
// 	beforeEach(function(){
// 		//mock module dependencies
// 		angular.module('ui-listView', []);
// 		angular.module('ngMessages', []);
// 		angular.module('xeditable', []);
// 		angular.module('ui.select', []);
// 		angular.module('ngSanitize', []);
//
// 		module(function($provide) {
// 			$provide.service('http', ['$q', function($q) {
// 				function post () {
// 					if(true){
// 						return $q.resolve('55');
// 					} else {
// 						return $q.reject();
// 					}
// 				};
//
// 				return{
// 					post: post
// 				};
// 			}]);
// 			$provide.service('blockUI', function() {
// 				this.stop = jasmine.createSpy('stop').and.callFake(function(num) {
// 					//a fake implementation
// 				});
// 			});
// 			$provide.service('alertService', function() {});
// 			$provide.service('$state', function() {});
// 			$provide.service('$uibModal', function() {});
// 			$provide.service('localStorageService', function() {
// 				this.get = function () {
// 					return 'get user';
// 				};
// 			});
// 			$provide.service('$stateParams', function() {});
// 			$provide.service('DTO', function() {
// 				this.catalogFilter = function () {
// 					return 'get user';
// 				};
// 				this.criteriaDTO = function () {
// 					return 'get user';
// 				};
// 			});
// 		});
//
// 		module('modules.dash');
//
// 		angular.mock.inject(function($controller, $rootScope, http, $q){
// 			var deferred = $q.defer();
// 			deferred.resolve('5');
// 			http = http;
// 			spyOn(http, 'post').and.returnValue(deferred.promise);
//
// 			// create new scope
// 			scope = $rootScope.$new();
// 			// inject to mockController $scope our newly created scope
// 			controller = $controller('catalogCtrl', {
// 				http : http,
// 				$scope: scope
// 			});
// 		});
// 	});
//
// 	it('Variable definition', function () {
// 		expect(controller.arr).toBeDefined();
// 	})
//
// 	// it('http service test', function () {
// 	// 	angular.mock.inject(function (http) {
// 	// 		controller.getAllTemplates();
// 	// 		expect(controller.FormTemplate).toEqual(12);
// 	// 	});
// 	// })
//
// 	it('http post test', function () {
// 		var result;
// 		http.post().then(function(returnFromPromise) {
// 			result = returnFromPromise;
// 		});
// 		scope.$apply();
// 		expect(result).toBe('5');
// 		expect(http.post).toHaveBeenCalled();
// 	})
// });

describe('Controller: Catalog Controller', function() {
	var controller, scope, http, $location;

	// dependencies and svc mocking
	beforeEach(function () {
		//mock module dependencies
		angular.module('ui-listView', []);
		angular.module('ngMessages', []);
		angular.module('xeditable', []);
		angular.module('ui.select', []);
		angular.module('ngSanitize', []);

		module(function($provide) {

			$provide.service('blockUI', function () {
				this.stop = jasmine.createSpy('stop').and.callFake(function (num) {
					//a fake implementation
				});
			});

			$provide.service('alertService', function() {});
			$provide.service('$state', function() {});
			$provide.service('$uibModal', function() {});
			$provide.service('localStorageService', function() {
				this.get = function () {
					return 'get user';
				};
			});
			$provide.service('$stateParams', function() {});
			$provide.service('DTO', function() {
				this.catalogFilter = function () {
					return 'get user';
				};
				this.criteriaDTO = function () {
					return 'get user';
				};
			});

		});
	});

	// http mock service
	beforeEach(function() {
		var mockHttp = {};
		module('modules.dash', function ($provide) {
			$provide.value('http', mockHttp);
		});

		inject(function ($q) {
			mockHttp.data = [
				{
					id: 0,
					name: 'Angular'
				},
				{
					id: 1,
					name: 'Ember'
				},
				{
					id: 2,
					name: 'Backbone'
				},
				{
					id: 3,
					name: 'React'
				}
			];

			mockHttp.post = function () {
				var defer = $q.defer();

				defer.resolve(this.data);

				return defer.promise;
			};
		});
	});

	beforeEach(inject(function($controller, $rootScope, _$location_, _http_) {
		scope = $rootScope.$new();
		$location = _$location_;
		http = _http_;
		controller = $controller('catalogCtrl', {
			$scope: scope,
			$location: $location,
			http: http
		});
	}));

	it('arr must be defined', function () {
		expect(controller.arr).toBeDefined();
	});

	it('arr must be defined', function () {
		// controller.getAllTemplates();
		spyOn(controller, 'getAllTemplates');
		// controller.getAllTemplates();
		//expect(controller.getAllTemplates).toHaveBeenCalled();
		// scope.$apply();
		// scope.$digest();
		expect(controller.getAllTemplates()).toEqual('5');
	});
});