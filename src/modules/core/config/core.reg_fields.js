'use strict';

angular.module('modules.core')

	.constant('reg_fields', [
		{
			title: 'Patient',
			active: true,
			type: 'patient',
			form: {
				options: {},
				model: undefined,
				fields: [
					{
						className: 'col-md-12',
						key: 'patient.FirstName',
						type: 'input',
						templateOptions: {
							label: 'First Name',
							required: true,
							placeholder: 'Enter your First Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'patient.LastName',
						type: 'input',
						templateOptions: {
							label: 'Last Name',
							required: true,
							placeholder: 'Enter your Last Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'patient.Emeil',
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
						key: 'patient.Password',
						type: 'input',
						templateOptions: {
							type: 'password',
							required: true,
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
			type: 'doctor',
			form: {
				model: undefined,
				fields: [
					{
						className: 'col-md-12',
						key: 'doctor.FirstName',
						type: 'input',
						templateOptions: {
							label: 'First Name',
							required: true,
							placeholder: 'Enter your First Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'doctor.LastName',
						type: 'input',
						templateOptions: {
							label: 'Last Name',
							required: true,
							placeholder: 'Enter your Last Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'doctor.Email',
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
						key: 'doctor.Password',
						type: 'input',
						templateOptions: {
							type: 'password',
							required: true,
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
			type: 'organization',
			form: {
				options: {},
				model: undefined,
				fields: [
					{
						className: 'col-md-12',
						key: 'organization.FirstName',
						type: 'input',
						templateOptions: {
							label: 'First Name',
							required: true,
							placeholder: 'Enter your First Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'organization.LastName',
						type: 'input',
						templateOptions: {
							label: 'Last Name',
							required: true,
							placeholder: 'Enter your Last Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'organization.Email',
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
						key: 'organization.Password',
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
						key: 'organization.Website',
						type: 'input',
						templateOptions: {
							label: 'website',
							required: true,
							placeholder: 'Enter your web-site'
						}

					},
					{
						className: 'col-md-12',
						key: 'organization.OrganizationName',
						type: 'input',
						templateOptions: {
							label: 'Organization name',
							required: true,
							placeholder: 'Full organization name'
						}

					},
					{
						className: 'col-md-12',
						key: 'organization.Address',
						type: 'input',
						templateOptions: {
							label: 'Address',
							required: true,
							placeholder: 'Organization Address'
						}
					}
				]
			}
		}
	]

);
