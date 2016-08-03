(function () {

	/*jshint -W117, -W097*/

	angular.module('modules.dash')

		.controller('catalogCtrl', function (http, blockUI, alertService, $state, $uibModal, localStorageService, $stateParams, $scope, $q, DTO) {
			var vm = this;
			vm.userType = localStorageService.get('user');
			vm.FormTemplate = [];
			vm.myForms = [];
			vm.user = localStorageService.get('user');
			vm.filter = DTO.catalogFilter();
			vm.patCheckboxes = ['All', 'Free', 'Paid'];
			vm.docCheckboxes = ['Med', 'Pat'];

       if ('DOCTOR' === vm.userType.userType) {
					vm.checkboxes= vm.patCheckboxes.concat(vm.docCheckboxes);
				}else{
	       vm.checkboxes=vm.patCheckboxes;
       }





			function selectAll() {
				var countTrue = 0, keys;

				function checkAll(check) {
					vm.filter.all = check;
					_.each(keys, function (key) {
						vm.filter[key] = check;
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

			vm.getAllTemplates = function () {
				return http.post('/catalog/all', DTO.criteriaDTO())
					.then(function (res) {
						blockUI.stop();
						if (res.state) {
							vm.FormTemplate = res.result;
						}
						return res.result;
					});
			};

			vm.getAllTemplates();


			vm.getMyTemplates = function () {
				return http.post('/mytemplates/all', DTO.criteriaDTO())
					.then(function (res) {
						blockUI.stop();
						if (res.state) {
							vm.myForms = res.result;
						}
						return res.result;
					});
			};

			vm.getMyTemplates();


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

			};

		});
})();