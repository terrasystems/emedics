exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: [
		'src/test/e2e/draftsCtrl.spec.js',
		'src/test/e2e/loginCtrl.spec.js'
	],
	capabilities: {
		'browserName': 'chrome'
	}
};