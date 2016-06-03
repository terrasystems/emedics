'use strict';
/*jshint -W117, -W097*/

angular.module('modules.core')

	.run(function (formlyConfig) {
		var attributes = [
			'date-disabled',
			'custom-class',
			'show-weeks',
			'starting-day',
			'init-date',
			'min-mode',
			'max-mode',
			'format-day',
			'format-month',
			'format-year',
			'format-day-header',
			'format-day-title',
			'format-month-title',
			'year-range',
			'shortcut-propagation',
			'datepicker-popup',
			'show-button-bar',
			'current-text',
			'clear-text',
			'close-text',
			'close-on-date-selection',
			'datepicker-append-to-body'
		];

		var bindings = [
			'datepicker-mode',
			'min-date',
			'max-date'
		];

		var ngModelAttrs = {};

		angular.forEach(attributes, function (attr) {
			ngModelAttrs[camelize(attr)] = {attribute: attr};
		});

		angular.forEach(bindings, function (binding) {
			ngModelAttrs[camelize(binding)] = {bound: binding};
		});

		formlyConfig.setType({
			name: 'datepicker',
			template: '<p class="input-group"><input type="text" id="{{::id}}" name="{{::id}}" ng-model="model[options.key]" class="form-control" ng-click="datepicker.open($event)" uib-datepicker-popup="{{to.datepickerOptions.format}}" is-open="datepicker.opened" datepicker-options="to.datepickerOptions"/><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="datepicker.open($event)" ng-disabled="to.disabled"><i class="glyphicon glyphicon-calendar"></i></button></span></p>',
			//templateUrl: 'datepicker.html',
			wrapper: ['bootstrapLabel', 'bootstrapHasError'],
			defaultOptions: {
				ngModelAttrs: ngModelAttrs,
				templateOptions: {
					datepickerOptions: {
						format: 'yyyy-MMMM-dd',
						initDate: new Date()
					}
				},
				parsers: [toDateConv],
				//formatters: [toStringConv]
			},
			controller: ['$scope', function ($scope) {
				$scope.datepicker = {};
				$scope.datepicker.opened = false;
				$scope.datepicker.open = function ($event) {
					$scope.datepicker.opened = !$scope.datepicker.opened;
				};
			}]
		});

		function camelize(string) {
			string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
				return chr ? chr.toUpperCase() : '';
			});
			// Ensure 1st char is always lowercase
			return string.replace(/^([A-Z])/, function (match, chr) {
				return chr ? chr.toLowerCase() : '';
			});
		}

		function toDateConv(value) {
			//console.log(value.toISOString().slice(0,10));
			if  (value && !(value === null)) {
				value = value.toISOString().slice(0,10);
			}
			return (value);
		}

		function toStringConv(value) {
			console.log('1) '+value);
			if  (value) {
				value = new Date(value);
				console.log('2) '+value);
			}
			return (value);
		}

	})


;
