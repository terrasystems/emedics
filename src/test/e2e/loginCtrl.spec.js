describe('login page', function() {
	beforeEach(function () {
		browser.driver.get('http://localhost:3000/#/login');
	});



	it('should render login page', function() {

		// Checking the current url
		var currentUrl = browser.driver.getCurrentUrl();
		expect(currentUrl).toMatch('/login');
	});

	it('should sign in', function() {

		// Find page elements
		var userNameField = browser.driver.findElement(By.id('vm.form_input_email_0'));
		var userPassField = browser.driver.findElement(By.id('vm.form_input_password_1'));
		var userLoginBtn  = browser.driver.findElement(By.id('login'));

		// Fill input fields
		userNameField.sendKeys('skiman@i.ua');
		userPassField.sendKeys('666666');

		// Ensure fields contain what we've entered
		expect(userNameField.getAttribute('value')).toEqual('skiman@i.ua');
		expect(userPassField.getAttribute('value')).toEqual('666666');

		// Click to sign in - waiting for Angular as it is manually bootstrapped.
		userLoginBtn.click().then(function() {
			browser.waitForAngular();
			expect(browser.driver.getCurrentUrl()).toMatch('/tasks');
		}, 10000);
	});

	it('shouldnt sign in', function() {

		// Find page elements
		var userNameField = browser.driver.findElement(By.id('vm.form_input_email_0'));
		var userPassField = browser.driver.findElement(By.id('vm.form_input_password_1'));
		var userLoginBtn  = browser.driver.findElement(By.id('login'));

		// Fill input fields
		userNameField.sendKeys('skiman@i.ua');
		userPassField.sendKeys('ebala');

		// Ensure fields contain what we've entered
		expect(userNameField.getAttribute('value')).toEqual('skiman@i.ua');
		expect(userPassField.getAttribute('value')).toEqual('ebala');

		// Click to sign in - waiting for Angular as it is manually bootstrapped.
		userLoginBtn.click().then(function() {
			browser.waitForAngular();
			expect(browser.driver.getCurrentUrl()).toMatch('/login');
		}, 10000);
	});

	// it('Verify that the user is logged in', function() {
	// 	//Delete all cookies
	// 	browser.driver.manage().deleteAllCookies();
	// 	//Enter UserName
	// 	element.all(by.model('username')).get(0).sendKeys('abc@wingify.com');
	// 	//Enter Password
	// 	element(by.model('password')).sendKeys('test');
	// 	//Click Submit button
	// 	element(by.css('.login-form button[type="submit"]')).click();
	// 	//Wait for the current URL to change to welcome
	// 	browser.driver.wait(function() {
	// 		return browser.driver.getCurrentUrl().then(function(url) {
	// 			return (/welcome/).test(url);
	// 		});
	// 	});
	// 	//Jasmine expect statement : compare actual and expected value
	// 	expect(browser.getCurrentUrl()).toEqual('https://app.vwo.com/#/welcome');
	// });
});