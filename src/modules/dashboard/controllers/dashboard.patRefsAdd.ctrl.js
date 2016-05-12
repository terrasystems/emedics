'use strict';
/*jshint	-W117, -W097*/

angular.module('modules.dash')

	.controller('patientReferencesAddCtrl', function ($state, localStorageService, initParamsPOST, http) {
		//console.log('..patientReferencesAddCtrl');
		var vm = this;
		vm.user = localStorageService.get('userData');
		vm.paramsPOST = initParamsPOST.params;
		vm.model = {};
		vm.fields = [
					{
						className: 'col-md-12',
						key: 'name',
						type: 'input',
						templateOptions: {
							label: 'Name',
							required: false,
							placeholder: 'Enter Name'
						}
					},
					{
						className: 'col-md-12',
						key: 'email',
						type: 'input',
						templateOptions: {
							type: 'email',
							required: false,
							label: 'Email address',
							placeholder: 'Enter email'
						}
					}
					];

		vm.onSubmit = function () {
			vm.model.id = null;
			vm.model.type = 'doc';

			console.log(vm.model);

			http.post('private/dashboard/'+vm.user.type+'/references/create', vm.model)
					.then(function (res) {
						blockUI.stop();
						console.log(res);
						$timeout(function () {
							$state.go('main.private.dashboard.ref');
						}, 500);
					});
		};

	});