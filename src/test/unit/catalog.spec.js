(function () {
	'use strict';
	describe('Testing modules.core', function () {
		var service,
			httpBackend,
			matchVal,
			httpUrl = '/api/v2/api/catalog/all',
			serviceUrl = '/api/catalog/all',
			succTestCase = {
				'state': true, 'msg': 'MSG_FORM', 'result': [
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
				]
			},
			errTestCase = {'status': 401, 'statusText': 'Unauthorized'};

		//you need to indicate your module in a test
		beforeEach(function () {
			module('modules.core');
			module('toastr');
			module('pascalprecht.translate');
		});

		beforeEach(inject(function (http, $httpBackend) {
			matchVal = null;
			service = http;
			httpBackend = $httpBackend;
		}));

		it('should have a http service', function () {
			assert.isDefined(service, 'http has been defined');
		});

		it('get success', function () {
			httpBackend.expect('GET', httpUrl).respond(200, succTestCase);
			service.get(serviceUrl).then(function (result) {
				matchVal = result;
			});
			httpBackend.flush();
			expect(matchVal).to.deep.equal(succTestCase);
		});

		it('get succ empty', function () {
			httpBackend.expect('GET', httpUrl).respond(200, {});
			service.get(serviceUrl).then(function (result) {
				matchVal = result;
			}, function (error) {
				matchVal = error;
			});
			httpBackend.flush();
			expect(matchVal).to.be.false;
		});

		it('get error', function () {
			httpBackend.expect('GET', httpUrl).respond(401, errTestCase);
			service.get(serviceUrl).then(function (result) {
				matchVal = result;
			}, function (error) {
				matchVal = error;
			});
			httpBackend.flush();
			assert.propertyVal(matchVal, 'status', 401);
		});


		it('post success', function () {
			httpBackend.expect('POST', httpUrl).respond(200, succTestCase);
			service.post(serviceUrl).then(function (result) {
				matchVal = result;
			});
			httpBackend.flush();
			expect(matchVal).to.deep.equal(succTestCase);
		});

		it('post scuccess empty', function () {
			httpBackend.expect('POST', httpUrl).respond(200, {});
			service.post(serviceUrl).then(function (result) {
				matchVal = result;
			}, function (error) {
				matchVal = error;
			});
			httpBackend.flush();
			expect(matchVal).to.be.false;
		});

		it('post error', function () {
			httpBackend.expect('POST', httpUrl).respond(401, errTestCase);
			service.post(serviceUrl).then(function (result) {
				matchVal = result;
			}, function (error) {
				matchVal = error;
			});
			httpBackend.flush();
			assert.propertyVal(matchVal, 'status', 401);

		});

		afterEach(function () {
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest();
		});
	});
})();