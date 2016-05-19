'use strict';
/*jshint -W117, -W097*/

angular.module('modules.core')

.constant('pat_fields', [
		{
			className: 'col-md-12',
			key: 'user.username',
			type: 'input',
			templateOptions: {
				label: 'Name',
				required: true,
				placeholder: 'Enter your Name'
			}
		},
		{
			className: 'col-md-12',
			key: 'user.email',
			type:'input',
			validators: {
				EmailAddress: {
					expression: function($viewValue, $modelValue) {
						var value = $modelValue || $viewValue;
						return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
					},
					message: '$viewValue + " is not a valid e-mail address"'
				}
			},
			templateOptions: {
				type: 'text',
				required: true,
				label: 'Email address',
				placeholder: 'Enter email'
			},
			validation: {
			messages: {
				required: function($viewValue, $modelValue, scope) {
					return scope.to.label + ' is required'
				}
			}
		}

		},


		{
			className: 'col-md-12',
			key: 'user.password',
			type: 'input',
			templateOptions: {
				type: 'password',
				required: true,
				label: 'Password',
				placeholder: 'Enter password'
			}
		}
	])

.constant('doc_fields', [
		{
			className: 'col-md-12',
			key: 'user.username',
			type: 'input',
			templateOptions: {
				label: 'Name',
				required: true,
				placeholder: 'Enter your Name'
			}
		},
		{
			className: 'col-md-12',
			key: 'user.email',
			type: 'input',
			validators: {
				EmailAddress: {
					expression: function($viewValue, $modelValue) {
						var value = $modelValue || $viewValue;
						return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
					},
					message: '$viewValue + " is not a valid e-mail address"'
				}
			},
			templateOptions: {
				type: 'text',
				required: true,
				label: 'Email address',
				placeholder: 'Enter email'
			},
			validation: {
				messages: {
					required: function($viewValue, $modelValue, scope) {
						return scope.to.label + ' is required'
					}
				}
			}


		},
		{
			className: 'col-md-12',
			key: 'user.password',
			type: 'input',
			templateOptions: {
				type: 'password',
				required: true,
				label: 'Password',
				placeholder: 'Enter password'
			}
		}
	])
.constant('org_fields', [
		{
			className: 'col-md-12',
			key: 'user.username',
			type: 'input',
			templateOptions: {
				label: 'Name',
				required: true,
				placeholder: 'Enter your Name'
			}
		},
		{
			className: 'col-md-12',
			key: 'user.email',
			type: 'input',
			validators: {
				EmailAddress: {
					expression: function($viewValue, $modelValue) {
						var value = $modelValue || $viewValue;
						return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
					},
					message: '$viewValue + " is not a valid e-mail address"'
				}
			},
			templateOptions: {
				type: 'text',
				required: true,
				label: 'Email address',
				placeholder: 'Enter email'
			},
			validation: {
				messages: {
					required: function($viewValue, $modelValue, scope) {
						return scope.to.label + ' is required'
					}
				}
			}
		},
		{
			className: 'col-md-12',
			key: 'user.password',
			type: 'input',
			templateOptions: {
				type: 'password',
				required: true,
				label: 'Password',
				placeholder: 'Enter password'
			}
		},
		{
			className: 'col-md-12',
			key: 'org.www',
			type: 'input',
			templateOptions: {
				label: 'website',
				required: true,
				placeholder: 'Enter your web-site'
			}
		},
		{
			className: 'col-md-12',
			key: 'org.fullname',
			type: 'input',
			templateOptions: {
				label: 'Organization name',
				required: true,
				placeholder: 'Full organization name'
			}
		},
		{
			className: 'col-md-12',
			key: 'org.address',
			type: 'input',
			templateOptions: {
				label: 'Address',
				required: true,
				placeholder: 'Organization Address'
			}
		},
		{
			className: 'col-md-12',
			key: 'org.type',
			type: 'select',
			templateOptions: {
				label: 'Type organization',
				required: true,
				placeholder: 'Type organization',
				options: [
					{name: 'Type #1', value: 'Type #1'},
					{name: 'Type #2', value: 'Type #2'},
					{name: 'Type #3', value: 'Type #3'}
				]
			}
		}

	]

);

