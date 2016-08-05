describe('draftCtrl', function () {

	it('the dom initially has a greeting', function () {
		browser.get('http://localhost:3000/#/drafts');
		expect(element(by.id('greeting')).getText()).toEqual('Hello, World!');
	});

});