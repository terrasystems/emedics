(function () {

	/*jshint -W117, -W097, -W007*/

	angular.module('modules.dash')

		.controller('catalogCtrl', function (http, blockUI, alertService, $state, $uibModal, localStorageService, $stateParams, $scope, $q, DTO) {
			var vm = this;
			vm.userType = localStorageService.get('user');
			vm.FormTemplate = [];
			vm.myForms = [];
			vm.user = localStorageService.get('user');
			vm.filter = DTO.catalogFilter();
			vm.patCheckboxes = ['all', 'free', 'paid'];
			vm.docCheckboxes = ['medical', 'patient'];

			if ('DOCTOR' === vm.userType.userType) {
				vm.checkboxes = vm.patCheckboxes.concat(vm.docCheckboxes);
			} else {
				vm.checkboxes = vm.patCheckboxes;
			}
			function applyFilter() {

				function checkFilter(item, filter) {
					return true;
				}

				vm.FormTemplate = _.filter(vm.FormTemplate, function (item) {
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
			}

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
							}
						});



			};

			//vm.getTemplates('all');


			//vm.getMyTemplates = function () {
			//	http.post('/mytemplates/all', DTO.criteriaDTO())
			//		.then(function (res) {
			//			blockUI.stop();
			//			if (res.state) {
			//				vm.myForms = res.result;
			//			}
			//
			//		});
			//};
			//
			//vm.getMyTemplates();


			vm.Buy = function () {
				console.log('PAID');
			};

			vm.Load = function (id) {
				http.get('/mytemplates/add/' + id)
					.then(function (res) {

						return res.result;

					}
				);
			};

			vm.View = function (id) {
				http.get('/catalog/view/' + id)
					.then(function (res) {
						blockUI.stop();
						return res.result;
					});
			};

			vm.Remove = function (id) {
				http.get('/mytemplates/remove/' + id)
					.then(function (res) {
						vm.getMyTemplates();
						blockUI.stop();

						return res.result;
					});
			};

			vm.AddTask = function (obj) {

				console.log('added' + obj);
			};

		});
})();