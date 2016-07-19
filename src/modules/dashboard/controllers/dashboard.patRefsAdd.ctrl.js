'use strict';
/*jshint -W117, -W097*/

angular.module('modules.dash')

	.controller('patientReferencesAddCtrl', function ($scope,$translate,$state, localStorageService, http, blockUI, $timeout, alertService, DTO) {
		var vm = this;
		vm.user = localStorageService.get('userData');

		vm.addRef = DTO.refAdd;


		vm.type1 = function() {
			vm.addRef = DTO.refAdd;
			vm.addRef.type = 'pat';
		};
		vm.type1();

		vm.type2=function(){
			vm.addRef = DTO.refAdd;
			vm.addRef.type = 'doc';

		};
		vm.type2();

		vm.onSubmit = function () {
			http.post('private/dashboard/' + vm.user.type + '/references/create', vm.addRef)
				.then(function (res) {
					blockUI.stop();
					if (res.state) {
						alertService.add(0, res.state.message);
					}
					$timeout(function () {
						$state.go('main.private.dashboard.abstract.ref');
					}, 500);
				});
		};

		vm.getTypes = function() {
			 http.get('public/dashboard/doc_type/doctor')
				 .then(function (res) {
					 blockUI.stop();
					 if (res.result) {
						 vm.types = res.result;
					 }
				 });
		};
		vm.getTypes();

//Datepicker
		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function() {
			$scope.dt = null;
		};

		$scope.inlineOptions = {
			customClass: getDayClass,
			minDate: new Date(),
			showWeeks: true
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(2020, 5, 22),
			minDate: new Date(),
			startingDay: 1
		};

		$scope.toggleMin = function() {
			$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
			$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
		};

		$scope.toggleMin();

		$scope.open1 = function() {
			$scope.popup1.opened = true;
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};

		$scope.setDate = function(year, month, day) {
			$scope.dt = new Date(year, month, day);
		};

		$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];
		$scope.altInputFormats = ['M!/d!/yyyy'];

		$scope.popup1 = {
			opened: false
		};

		$scope.popup2 = {
			opened: false
		};

		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		var afterTomorrow = new Date();
		afterTomorrow.setDate(tomorrow.getDate() + 1);
		$scope.events = [
			{
				date: tomorrow,
				status: 'full'
			},
			{
				date: afterTomorrow,
				status: 'partially'
			}
		];

		function getDayClass(data) {
			var date = data.date,
				mode = data.mode;
			if (mode === 'day') {
				var dayToCheck = new Date(date).setHours(0,0,0,0);

				for (var i = 0; i < $scope.events.length; i++) {
					var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

					if (dayToCheck === currentDay) {
						return $scope.events[i].status;
					}
				}
			}
			return '';
		}

	});