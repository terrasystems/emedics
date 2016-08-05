(function () {


	/*jshint -W117, -W097, -W116*/

	angular.module('modules.dash')

		.controller('addReferenceCtrl', function ($translate, localStorageService, http, DTO, $uibModalInstance,$state) {
			var vm = this;


			//	vm.model = model;
			vm.user = localStorageService.get('user');
			vm.users = [];
			vm.filterTitle = $translate.instant('Search and add reference');
			vm.placeholder = $translate.instant('SEARCH_REFS2');
			vm.search = '';
			vm.references = [];
			vm.criteriaDTO = DTO.criteriaDTO();


			vm.findReferences = function (value) {
				vm.criteriaDTO.search = value;
				http.post('/references/all', vm.criteriaDTO)
					.then(function (resp) {
						vm.references = resp.result;
						if (resp.result.length === 0) {
							vm.references.push({AddNew: 'add', id:'addNew'});
						}
					});
			};

			vm.onSelect = function (model) {
				if('addNew' === model.id){
					$state.go('.editor',{name:vm.search});
					$uibModalInstance.close();
				}
				vm.id = model.id;
			};

			vm.addReference = function () {
				http.get('/references/add/' + vm.id)
					.then(function (resp) {
						if (resp.state) {
							$uibModalInstance.close();
						}
					});

			};


		});
})();