'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')
	.run(function(editableOptions) {
		editableOptions.theme = 'bs3';
	})

	.controller('patientReferencesCtrl', function ($state, http, blockUI, $scope, localStorageService, initParamsPOST, alertService) {
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.searchref = '';
		vm.references = [];

		//*** add item in list
		$scope.onApply = function (obj) {
			if ($scope.doctor && $scope.doctor.id && $scope.doctor.id !==null && $scope.doctor.id !=='') {
				vm.paramsPOST = initParamsPOST.params;
				vm.paramsPOST.criteria.list = [];
				vm.paramsPOST.criteria.list.push($scope.doctor.id);
				http.post('private/dashboard/' + vm.user.type + '/references/add', vm.paramsPOST)
					.then(function (res) {
						blockUI.stop();
						alertService.add(0, res.state.message);
						vm.refresh();
					});
			}
			$scope.doctor='';
		};

		//*** get all items
		vm.refresh = function () {
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.list = [];
			http.get('private/dashboard/' + vm.user.type + '/references', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.result) {
						vm.references = res.result;
					}
				});
		};
		vm.refresh();

		//*** delete item
		vm.onRemove = function (index, id) {
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.list = [];
			vm.paramsPOST.criteria.list.push(id);
			http.post('private/dashboard/' + vm.user.type + '/references/remove', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					alertService.add(0, res.state.message);
					vm.refresh();
				});
		};

		//*** create item
		vm.addFormList = function () {
			$state.go('main.private.dashboard.abstract.refadd');
		};

		// Any function returning a promise object can be used to load values asynchronously
		$scope.getFindRefs = function (val) {
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.search = val;
			return http.post('private/dashboard/' + vm.user.type + '/references/search', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if  (angular.isArray(res.result) && res.result.length>0) {
						res.result.map(function (item) {
							item.all = item.name + ', ' + item.email + ( (item.type == null) ? '' : ', ' + item.type);
							return item;
						});
					} else {
						res.result.push( { all: 'Add new reference...', id: 'add' } );
					}
					return res.result;
				});
		};

		$scope.onSelect = function (item) {
			if  (item.id && item.id == 'add') {
				vm.addFormList();
			}
		};

		vm.onInvite = function (id, $event) {
			if($event){
				$event.stopPropagation();
				$event.preventDefault();
			}
			http.get('private/dashboard/' + vm.user.type + '/references/invite/' + id)
				.then(function (res) {
					blockUI.stop();
					if  (res.state) {
						alertService.add(0, res.state.message);
						vm.refresh();
					}
				});
		};

});


