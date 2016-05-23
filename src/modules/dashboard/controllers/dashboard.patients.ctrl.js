'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')
	.controller('patientsCtrl', function($scope, http, blockUI, initParamsPOST, $state, alertService){
		var vm = this;
		vm.searchref = '';

		vm.patients = [
		{
			'id': '32',
			'email': 'tggg1@testmail.com',
			'phone': '555-55-55',
			'name': 'Patient #100',
			'forms': [
				{
				'id': '32',
				'data': null,
				'blank': {
					'body': null,
					'name': 'Blank Name',
					'type': '1',
					'descr': 'Descr1',
					'category': 'main Categ',
					'number': 'F1'
				},
				'active': 'true'
				},
				{
					'id': '33',
					'data': null,
					'blank': {
						'body': null,
						'name': 'Blank Name #2',
						'type': '2',
						'descr': 'Descr2',
						'category': 'main Categ',
						'number': 'F2'
					},
					'active': 'true'
				}
			]
		},
		{
			'id': '3002',
			'email': 'aaaaa2@testmail.com',
			'phone': '555-55-55',
			'name': 'Patient #2000',
			'forms': [
			{
				'id': '320',
				'data': null,
				'blank': {
					'body': null,
					'name': 'Blank Name',
					'type': '1',
					'descr': 'Descr1',
					'category': 'main Categ',
					'number': 'F1'
				},
				'active': 'true'
			},
			{
				'id': '33',
 				'data': null,
				'blank': {
					'body': null,
					'name': 'Blank Name #2',
					'type': '2',
					'descr': 'Descr2',
					'category': 'main Categ',
					'number': 'F2'
				},
				'active': 'true'
			}
			]
		}
		];

		vm.refresh = function () {
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.list = [];
			http.get('private/dashboard/docpatients', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if (res.result && angular.isArray(res.result) && res.result.length>0) {
						vm.patients = res.result;
					}
				});
		};
		vm.refresh();

		vm.onEdit = function(formID, patientId) {
			console.log('formID: '+ formID +', patID: ' + patientId );
			$state.go('main.private.dashboard.abstract.tasks.edit', {id: formID, type: 'patientss', patId: patientId});
		};

		$scope.getFindPatients = function (val) {
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.search = val;
			return http.post('private/dashboard/docpatients/search', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					if  (angular.isArray(res.result) && res.result.length>0) {
						res.result.map(function (item) {
							item.all = item.name + ', ' + item.email + ( (item.type == null) ? '' : ', ' + item.type);
							return item;
						});
					}
					return res.result;
				});
		};

		$scope.onApply = function (obj) {
			if ($scope.doctor && $scope.doctor.id && $scope.doctor.id !==null && $scope.doctor.id !=='') {
				vm.paramsPOST = initParamsPOST.params;
				vm.paramsPOST.criteria.list = [];
				vm.paramsPOST.criteria.search = '';
				vm.paramsPOST.criteria.list.push({id: $scope.doctor.id});
				http.post('private/dashboard/docpatients/add', vm.paramsPOST)
					.then(function (res) {
						blockUI.stop();
						alertService.add(0, res.state.message);
						vm.refresh();
					});
			}
		};

	});
