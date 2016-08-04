(function () {

	/*jshint -W117, -W097, -W007*/

	angular.module('modules.dash')
		.controller('catalogCtrl', catalogCtrl);

	function catalogCtrl (http, blockUI, localStorageService, $scope, DTO, $log) {
		{
			var vm = this;
			vm.template = [];
			vm.user = localStorageService.get('user')? localStorageService.get('user'):{};
			vm.filter = DTO.catalogFilter();
			vm.patCheckboxes = ['all', 'free', 'paid'];
			vm.docCheckboxes = ['medical', 'patient'];

			if ('DOCTOR' === vm.user.userType || 'ORG' === vm.user.userType) {
				vm.checkboxes = vm.patCheckboxes.concat(vm.docCheckboxes);
			} else {
				vm.checkboxes = vm.patCheckboxes;
			}

			$scope.$watch(

				'vm.filter'
				,
				function (newValue, oldValue) {

					if (!angular.equals(newValue, oldValue)) {
						applyFilter();
					}
				}, true
			);

			function checkFilter(item, filter) {
				var mass=[], result = true;

				if(filter.free && !filter.paid){
					mass.push({field:'commerce', value:false});
				}
				if(filter.paid && !filter.free){
					mass.push({field:'commerce', value:true});
				}
				if (filter.patient && !filter.medical){
					mass.push({field:'type', value:'PATIENT'});
				}
				if (filter.medical && !filter.patient){
					mass.push({field:'type',value:'MEDICAL'});
				}
				_.each(mass, function (res) {
					if (item[res.field] !== res.value){
						result = false;
					}

				});
				return result;

			}

			function applyFilter() {
          vm.filterTemplate = _.filter(vm.template, function (item) {
					if (checkFilter(item, vm.filter)) {
						return item;
					}
				});
			}

			vm.check = function (type) {
				if (('all' !== type) && (true === vm.filter[type])) {
					return;
				}
				switch (type) {
					case 'patient':
					{
						vm.filter.medical = true;
						break;
					}
					case 'medical':
					{
						vm.filter.patient = true;
						break;
					}
					case 'free':
					{
						vm.filter.paid = true;
						break;
					}
					case 'paid':
					{
						vm.filter.free = true;
						break;
					}
					default :
					{
						selectAll();
					}
				}
			};

			function selectAll() {
				var countTrue = 0, keys, allwaysTrueKeys = ['patient', 'free'];

				function checkAll(check) {
					vm.filter.all = check;
					_.each(keys, function (key) {
						vm.filter[key] = check;
					});
					_.each(allwaysTrueKeys, function (key) {
						vm.filter[key] = true;
					});
				}

				keys = _.difference(Object.keys(vm.filter), ['search', 'all']);

				_.each(keys, function (key) {
					countTrue += vm.filter[key] ? 1 : 0;
				});
				if (countTrue < keys.length) {
					checkAll(true);
				} else {
					checkAll(false);
				}
			}

			vm.arr = [];

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
							vm.filterTemplate = res.result;
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
	};


})();