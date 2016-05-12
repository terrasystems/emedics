'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')
	.run(function(editableOptions) {
		editableOptions.theme = 'bs3';
	})

	.controller('patientReferencesCtrl', function ($state, http, blockUI, $scope, localStorageService, initParamsPOST, alertService) {
		//console.log('..patientReferencesCtrl');
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.paramsPOST = initParamsPOST.params;
   		vm.searchref = '';
		vm.references = [
			{id: '10', name: 'Klod', type: 'HOSPITAL', phone: '8 555 896-45-55', is_check: false},
			{id: '12', name: 'Klod', type: 'PHARMACY', phone: '8 500 596-45-56', is_check: false},
			{id: '13', name: 'Dod', type: 'HOMECARE', phone: '8 545 896-45-53', is_check: false},
			{id: '14', name: 'Slay', type: 'MD', phone: '8 544 896-45-51', is_check: false},
			{id: '15', name: 'Koddy', type: 'INSURANCE', phone: '8 566 896-45-50', is_check: false},
			{id: '17', name: 'Don K.', type: 'Doctor', phone: '8 555 896-45-55', is_check: false},
			{id: '18', name: 'Phil R.', type: 'Doctor', phone: '8 888 596-45-56', is_check: false},
			{id: '19', name: 'Dimon G.', type: 'Organization', phone: '8 777 896-45-53', is_check: false},
			{id: '20', name: 'Sool D.', type: 'Organization', phone: '8 111 896-45-51', is_check: false},
		];

		vm.onSetSelect = function(obj) {
			console.log('%% '+obj);
			vm.selectID = obj.id;
		};

		//*** add item in list
		vm.onApply = function(obj) {
			if  (vm.selectID && (vm.selectID !== null)){
				console.log('!! '+vm.selectID);
				vm.paramsPOST = initParamsPOST.params;
				vm.paramsPOST.criteria.list.push({'id': vm.selectID});
				http.post('private/dashboard/'+vm.user.type+'/references/add', vm.paramsPOST)
					.then(function (res) {
						blockUI.stop();
						console.log(res);
						alertService.add(0, res.state.message);
					});
			}
		};

		//*** get all items
		vm.refresh = function() {
			http.get('private/dashboard/' + vm.user.type + '/references', vm.paramsPOST)
				.then(function (res) {
					console.log('get all..');
					blockUI.stop();
					if (res.result) {
						vm.references = res.result;
					}
				});
		};
		vm.refresh();

		//*** delete item
		vm.remove = function(index, id) {
			console.log('del ... index='+index+', id='+id);
			vm.paramsPOST = initParamsPOST.params;
			vm.paramsPOST.criteria.list.push({'id': id});
			http.post('private/dashboard/'+vm.user.type+'/references/remove', vm.paramsPOST)
				.then(function (res) {
					blockUI.stop();
					console.log(res);
					vm.references.splice(index, 1);
				});
		};

		//*** create item
		vm.addFormList = function() {
			$state.go('main.private.dashboard.refadd');
		};

		//Search

		$scope.$watch('doctor.selected', function(newVal, oldVal) {
			if (newVal !== oldVal) {
				if (vm.doctors.indexOf(newVal) === -1) {
					vm.doctors.unshift(newVal);
				}
			}
		});

		vm.getDoctors = function(search) {
			//console.log('$$ '+search);
			vm.newDocs = vm.doctors.slice();
			if (search && vm.newDocs.indexOf(search) === -1) {
				vm.newDocs.unshift(search);
			}
			return vm.newDocs;
		};
		vm.doctors = [
			{
				'id': 12,
				"name": "Petya",
				'tel':89879879879,
				"city": "Khmelnitsky"
			},
			{	'id': 130,
				"name": "Vitya",
				"tel": 1456364,
				"city": "Khmelnitsky"
			},
			{	'id': 222,
				"name": "Andrew",
				"tel": 26576757,
				"city": "Khmelnitsky"
			},
			{	'id': 602,
				"name": "Anton",
				"tel": 233,
				"city": "Khmelnitsky"
			},
			{	'id': 1,
				"name": "Misha",
				"tel": 434435,
				"city": "Khmelnitsky"
			}
		].sort();

	}
);


