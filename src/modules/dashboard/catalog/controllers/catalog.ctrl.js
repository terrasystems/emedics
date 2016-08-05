(function () {

	/*jshint -W117, -W097, -W007*/

	function catalogCtrl(http, blockUI, localStorageService, $scope, DTO, $log, userTypes) {

		var vm = this;
		vm.filtered = [];
		vm.find = '';
		vm.user = localStorageService.get('user') ? localStorageService.get('user') : {};
		vm.filterDTO = DTO.catalogFilter();
		vm.filter = {commerce:'all', type:'all'};
		vm.confFilter = [];
		vm.filterTemplate = [];
		vm.patCheckboxes = ['all', 'free', 'paid'];
		vm.docCheckboxes = ['all', 'medical', 'patient'];


		function applyCommerce(commerce, arr) {
			if ('all' === commerce) {
				return arr;
			}
			else {
				return _.filter(arr, {commerce: commerce});
			}
		};

		function applyType(type, arr) {
			if ('all' === type) {
				return arr;
			}
			else {
				return _.filter(arr, {type: type});
			}
		}

		function applySearch(search, arr) {
			if (search) {
				return _.filter(arr, {name: search});
			} else
			{
				return arr;
			}
		}

		vm.applyFilter = function () {
			vm.filtered = applyCommerce(vm.filter.commerce, vm.template);
			vm.filtered = applyType(vm.filter.type, vm.filtered);
			vm.filtered = applySearch(vm.filter.search, vm.filtered);
		};


		/*
		 vm.checkByType = function (type) {
		 switch (type) {
		 case'medical':
		 {
		 vm.filtered = apllyTypes('MEDICAL');
		 break;
		 }
		 case'patient':
		 {
		 vm.filtered = apllyTypes('PATIENT');
		 break;
		 }
		 case'paid':
		 vm.filtered = apllyCommerce(null, true);
		 break;

		 case'free':
		 vm.filtered = apllyCommerce(null, false);
		 break;
		 default:
		 {
		 vm.filtered = JSON.parse(JSON.stringify(vm.template));
		 }
		 }

		 };
		 */
		vm.getTemplates = function (type) {
			var url;
			if ('all' === type) {
				url = '/catalog/all';
			}
			else {
				url = '/mytemplates/all';
			}

			http.post(url, DTO.criteriaDTO())
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						vm.template = res.result;
						vm.filtered = angular.copy(res.result);
					}
				});


		};

		vm.getTemplates('all');


		vm.buy = function () {
			$log.debug('PAID');
		};

		vm.load = function (id) {
			http.get('/mytemplates/add/' + id)
				.then(function (res) {

					return res.result;

				}
			);
		};

		vm.view = function (id) {
			http.get('/catalog/view/' + id)
				.then(function (res) {
					blockUI.stop();
					return res.result;
				});
		};

		vm.remove = function (id) {
			http.get('/mytemplates/remove/' + id)
				.then(function (res) {
					vm.getTemplates();
					blockUI.stop();

					return res.result;
				});
		};

		vm.addTask = function (obj) {

			$log.debug('added' + obj);
		};


	}


	angular.module('modules.dash')
		.controller('catalogCtrl', catalogCtrl);


})();