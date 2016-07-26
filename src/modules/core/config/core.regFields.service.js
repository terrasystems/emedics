'use strict';
/*jshint -W117, -W097*/

angular.module('modules.core')
	.service('regFields', function ($translate) {
		var baseFields =
			[
				{
					className: 'col-md-12',
					key: 'user.firstName',
					type: 'input',
					templateOptions: {
						label: $translate.instant('NAME'),
						placeholder: $translate.instant('USER_NAME'),
						required: false
					},
					validation: {
						show: true
					}
				},
				{
					className: 'col-md-12',
					key: 'user.lastName',
					type: 'input',
					templateOptions: {
						label: $translate.instant('LAST_NAME'),
						placeholder: $translate.instant('ENTER_LAST_NAME'),
						required: false
					},
					validation: {
						show: true
					}
				},
				{
					className: 'col-md-12',
					key: 'user.birth',
					type: 'datepicker',
					templateOptions: {
						type: 'text',
						required: false,
						label: $translate.instant('BIRTH_DATE'),
						placeholder: $translate.instant('BIRTH_DATE'),
						datepickerPopup: 'yyyy-MMMM-dd'
					},
					validation: {
						show: true
					}
				}, {
				className: 'col-md-12',
				key: 'user.email',
				type: 'input',
				validators: {
					EmailAddress: {
						expression: function ($viewValue, $modelValue) {
							var value = $modelValue || $viewValue;
							return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(value);
						},
						message: '$viewValue + $translate.instant("NO_VALID_EMAIL")'
					}
				},
				templateOptions: {
					type: 'text',
					required: true,
					label: $translate.instant('EMAIL'),
					placeholder: $translate.instant('EMAIL_1')
				},
				validation: {
					show: true,
					messages: {
						required: function ($viewValue, $modelValue, scope) {
							return scope.to.label + ' is required';
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
						label: $translate.instant('PASSWORD'),
						placeholder: $translate.instant('PASSWORD_1')
					},
					validation: {
						show: true
					}
				}, {
				className: 'col-md-12',
				key: 'user.address',
				type: 'input',
				templateOptions: {
					required: false,
					label: $translate.instant('ADDRESS'),
					placeholder: $translate.instant('ORG_ADDRESS')
				},
				validation: {
					show: true
				}
			},
				{
					className: 'col-md-12',
					key: 'user.phone',
					type: 'input',
					templateOptions: {
						required: false,
						label: $translate.instant('PHONE'),
						placeholder: $translate.instant('PHONE')
					},
					validation: {
						show: true
					}
				}
			];

		function patient() {
			return baseFields;
		};
		function doctor() {
			return baseFields.concat([
				{
					className: 'col-md-12',
					key: 'user.type',
					type: 'select',
					templateOptions: {
						required: true,
						label: $translate.instant('DOC_TYPE'),
						placeholder: $translate.instant('DOC_TYPE'),
						options: []
					},
					validation: {
						show: true
					}
				}
			]);
		};
		function org() {
			return baseFields.concat([
				{
					className: 'col-md-12',
					key: 'user.orgname',
					type: 'input',
					templateOptions: {
						required: true,
						label: $translate.instant('ORG_NAME'),
						placeholder: $translate.instant('ORG_NAME_FULL')
					},
					validation: {
						show: true
					}
				},
				{
					className: 'col-md-12',
					key: 'user.www',
					type: 'input',
					templateOptions: {
						required: false,
						label: $translate.instant('WEBSITE'),
						placeholder: $translate.instant('WEBSITE_1')
					},
					validation: {
						show: true
					}
				},
				{
					className: 'col-md-12',
					key: 'user.type',
					type: 'select',
					templateOptions: {
						required: true,
						label: $translate.instant('ORG_TYPE'),
						placeholder: $translate.instant('ORG_TYPE'),
						options: []
					},
					validation: {
						show: true
					}
				}
			]);
		};

		//region <For Serttings>
		function settings() {
			return baseFields.concat([
				{
					className: 'col-md-12',
					key: 'user.typeExp',
					type: 'select',
					templateOptions: {
						required: false,
						label: $translate.instant('TYPE_EXPORT'),
						placeholder: $translate.instant('TYPE_EXPORT'),
						options: [
							{name: $translate.instant('PDF'), value: 'PDF'},
							{name: $translate.instant('HTML'), value: 'HTML'}
						]
					},
					validation: {
						show: true
					}
				},
				{
					className: 'col-md-12',
					key: 'user.type',
					type: 'select',
					templateOptions: {
						required: true,
						label: $translate.instant('USER_TYPE'),
						placeholder: $translate.instant('USER_TYPE'),
						options: []
					},
					validation: {
						show: true
					}
				}
			]);
		};
		//endregion
		return {
			patient:patient,
			doctor:doctor,
			org:org,
			settings:settings
		}
	});
