'use strict';
/*jshint -W117, -W097*/

angular.module('modules.core')

	.constant('reg_fields', [
		{
			title: 'Patient',
			active: true,
			index : 0,
			type: 'pat',
			form: {
				options: {},
				model: undefined,
				fields: [
					{
						className: 'col-md-12',
						key: 'pat.user.username',
						type: 'input',
						templateOptions: {
							label: 'Name',
							required: false,
							placeholder: 'Enter your Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'pat.user.email',
						type:'input',
						templateOptions: {
							type: 'email',
							required: false,
							label: 'Email address',
							placeholder: 'Enter email'
						}
					},
					{
						className: 'col-md-12',
						key: 'pat.user.password',
						type: 'input',
						templateOptions: {
							type: 'password',
							required: false,
							label: 'Password',
							placeholder: 'Enter password'
						}
					}
				]
			}
		},
		{
			title: 'Doctor',
			active: false,
			index : 1,
			type: 'doc',
			form: {
				model: undefined,
				fields: [
					{
						className: 'col-md-12',
						key: 'doc.user.username',
						type: 'input',
						templateOptions: {
							label: 'Name',
							required: false,
							placeholder: 'Enter your Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'doc.user.email',
						type: 'input',
						templateOptions: {
							type: 'email',
							required: false,
							label: 'Email address',
							placeholder: 'Enter email'
						}
					},
					{
						className: 'col-md-12',
						key: 'doc.user.password',
						type: 'input',
						templateOptions: {
							type: 'password',
							required: false,
							label: 'Password',
							placeholder: 'Enter password'
						}
					}
				]
			}
		},
		{
			title: 'Homecare Organization',
			active: false,
			index : 2,
			type: 'org',
			form: {
				options: {},
				model: undefined,
				fields: [
					{
						className: 'col-md-12',
						key: 'org.user.username',
						type: 'input',
						templateOptions: {
							label: 'Name',
							required: false,
							placeholder: 'Enter your Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'org.user.email',
						type: 'input',
						templateOptions: {
							type: 'email',
							required: false,
							label: 'Email address',
							placeholder: 'Enter email'
						}
					},
					{
						className: 'col-md-12',
						key: 'org.user.password',
						type: 'input',
						templateOptions: {
							type: 'password',
							required: false,
							label: 'Password',
							placeholder: 'Enter password'
						}
					},
					{
						className: 'col-md-12',
						key: 'org.org.www',
						type: 'input',
						templateOptions: {
							label: 'website',
							required: false,
							placeholder: 'Enter your web-site'
						}
					},
					{
						className: 'col-md-12',
						key: 'org.org.fullname',
						type: 'input',
						templateOptions: {
							label: 'Organization name',
							required: false,
							placeholder: 'Full organization name'
						}
					},
					{
						className: 'col-md-12',
						key: 'org.org.address',
						type: 'input',
						templateOptions: {
							label: 'Address',
							required: false,
							placeholder: 'Organization Address'
						}
					}
				]
			}
		}
	]

);
