(function(){
/*jshint -W117, -W097*/
	angular.module('modules.dash')

	.controller('referencesCtrl', function ($state, http, blockUI, localStorageService, alertService, $uibModal, $q, DTO) {
		var vm = this;
		vm.user = localStorageService.get('user');
		vm.references = [];
		vm.search = '';

		vm.remove = function (id, $event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.get('/references/remove/'+id)
				.then(function () {
					blockUI.stop();
					vm.getReferences(vm.search);
				});
		};

		vm.invite = function (id, $event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.get('/references/invite/' + id)
				.then(function (res) {
					blockUI.stop();
					if  (res.state) {
						vm.getReferences(vm.search);
					}
				});
		};

		vm.addRef = function () {
			var config = {
				templateUrl: 'modules/modal/views/addReference.html',
				controller: 'addReferenceCtrl',
				controllerAs: 'vm',
				resolve: {
					model: function($q) {
						var deferred = $q.defer();
						deferred.resolve({});
						return deferred.promise;
					}
				}
			};
			var modal = $uibModal.open(config);
			modal.result.then(function (){
				vm.getReferences(vm.search);
			});
		};

		vm.getReferences = function (val) {
			var criteriaDTO = DTO.criteriaDTO();
			criteriaDTO.search = val;
			return http.post('/references/my',  criteriaDTO)
				.then(function (res) {
					blockUI.stop();
					if (angular.isArray(res.result)) {
						vm.references = res.result;
					}
					return res.result;
				});
		};
		vm.getReferences('');

		vm.refInfo = function(ref) {
			$state.go('main.dashboard.references.info', {ref: ref});
		};
});


})();