(function () {
'use strict';
/*jshint -W117, -W097*/
	angular.module('modules.dash')
		.controller('draftsCtrl', draftsCtrl);

	function draftsCtrl (offlineRepository) {
		var vm = this,
				taskDTO = {
					fromUser: 'fromUser',
					toUser: 'toUser',
					descr: 'Description',
					template: 'template',
					patient: 'patient',
					date: '25.06.2005',
					status: 'status',
					model: 'model',
					_id : '25',
					type : 'task'
				};
		vm.list = {};

		vm.onDelete = onDelete;

		offlineRepository.init();
		offlineRepository.addPouchDoc(taskDTO);

		loadDrafts();

		function onDelete(_id) {
			offlineRepository.deleteTask(_id).then(function () {
				loadDrafts();
			});
		};

		function loadDrafts() {
			offlineRepository.getAllTasks().then(function (res) {
				vm.list.rows = res.rows;
			});
		};
	}
})();