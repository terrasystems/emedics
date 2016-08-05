(function () {
	/*jshint -W117, -W097, -W089, -W061*/

	angular.module('modules.core')
		.service('offlineRepository', function ($q, $log, alertService, localStorageService, pouchDB, $http, constants, designDoc) { //NOSONAR
			var vm = this

			function syncOnline() {
				var promises = [], tmp = [];
				promises.push(vm.db.query('index/docType', {key: 'task', include_docs: true}));
				promises.push(vm.db.query('index/docType', {key: 'sent', include_docs: true}));
				$q.all(promises).then(function (results) {
					_.each(results, function (res) {
						tmp = tmp.concat(_.map(res.rows, 'doc'));
					});

					$http.post(constants.restUrl + '/private/dashboard/tasks/syncTasks', tmp).then(function () {
					}, function (error) {
						$log.error(error);
					});
					//
				});
			};

			//create or update offline draft document
			function addPouchDoc(doc) {
				var deferred = $q.defer(),
						type = doc && doc.type && doc.type.toUpperCase()+'_' || '';
				vm.db.get(doc._id).then(function (res) {
					if (!_.isEqual(_.omit(res, '_rev'), doc)) { // check if docs are equal to not update on every page refresh
						doc._rev = res._rev;
						vm.db.put(doc).then(function (res) {
							alertService.success(res.ok, type+'UPDATED');
						}, function (err) {
							alertService.error(err.message, type+'UPDATE_ERROR');
						});
					}
				}, function (error) {
					if (error && error.name === 'not_found') {
						vm.db.put(doc).then(function (res) {
							alertService.success(res.ok, type+'CREATED');
						}, function (err) {
							alertService.error(err.message, type+'CREATE_ERROR');
						});
					}
				});
				return deferred.promise;
			}

			function createDesignDoc() {
				// create a design doc
				var ddoc = designDoc.index;
					addPouchDoc(ddoc);
			};

			function getAllTasks() {
				return vm.db.query('index/docType', {key: 'task', include_docs: true});
			};
			function getAllTemplates() {
				return vm.db.query('index/docType', {key: 'template', include_docs: true});
			};
			function getUserTemplates() {
				return vm.db.query('index/docType', {key: 'userTemplate', include_docs: true});
			};
			function getReferences() {
				return vm.db.query('index/docType', {key: 'reference', include_docs: true});
			};
			function getTask(id) {
				return vm.db.get(id);
			};
			function getPatients() {
				return vm.db.query('index/docUserType', {key: 'PATIENT', include_docs: true});
			};
			function getStaff() {
				return vm.db.query('index/docType', {key: 'staff', include_docs: true});
			};
			function sendTask(params) {
				var deferred = $q.defer();

				vm.db.get(params.event).then(function (doc) {

					params._id = doc._id;
					params._rev = doc._rev;
					params.type = 'sent';
					vm.db.put(params, function (res) {
						deferred.resolve(res);
					});
				}, function (error) {
					if (404 === error.status) {
						params.type = 'sent';
						params._id = params.event;
						vm.db.put(params, function (res) {
							deferred.resolve(res);
						});
					}
				});

				return deferred.promise;
			};
			function editTask(params) {
				var deferred = $q.defer();
				if (params.event) {


					vm.db.get(params.event.id).then(function (doc) {

						params.event._id = doc._id;
						params.event._rev = doc._rev;
						params.event.type = 'task';
						vm.db.put(params.event, function (res) {
							deferred.resolve(res);
						});
					}, function (error) {
						if (404 === error.status) {
							params.event.type = 'task';
							params.event._id = params.event;
							vm.db.put(params.event, function (res) {
								deferred.resolve(res);
							});
						}
					});
				}
				return deferred.promise;
			}

			function loadTask() {

			};

			function deleteTask(_id) {
				var deferred = $q.defer();
				vm.db.get(_id).then(function (doc) {
					vm.db.remove(doc).then(function (res) {
						deferred.resolve(res);
					});
				});
				return deferred.promise;
			};

			function init() {
				vm.user = localStorageService.get('user');
				vm.db = pouchDB(vm.user.id);
				vm.serv.__proto__ = vm.db;
				createDesignDoc();
			};
			vm.serv = {
				init: init,
				syncOnline: syncOnline,
				addPouchDoc: addPouchDoc,
				getAllTasks: getAllTasks,
				getAllTemplates: getAllTemplates,
				getUserTemplates: getUserTemplates,
				getReferences: getReferences,
				getPatients: getPatients,
				getStaff: getStaff,
				getTask: getTask,
				sendTask: sendTask,
				loadTask: loadTask,
				editTask: editTask,
				deleteTask : deleteTask
			}
			return vm.serv;
		})
})();
