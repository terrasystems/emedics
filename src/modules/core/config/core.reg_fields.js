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
			templateOptions: {
				type: 'email',
				required: true,
				label: 'Email address',
				placeholder: 'Enter email'
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
			templateOptions: {
				type: 'email',
				required: true,
				label: 'Email address',
				placeholder: 'Enter email'
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
			templateOptions: {
				type: 'email',
				required: true,
				label: 'Email address',
				placeholder: 'Enter email'
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
	]);
