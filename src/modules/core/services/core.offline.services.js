(function () {
	/*jshint -W117, -W097, -W089, -W061*/

	angular.module('modules.core')
		.service('offlineRepository', function ($q, $log, localStorageService, pouchDB, $http, constants, designDoc) {
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

			//Save or add draft document
			function addDraft(id, info, model) {
				var deferred = $q.defer();
				if (id === 'add') {
					id = 'draft:' + info.rawData.template.id;

				}// else {
				vm.db.get(id).then(function (doc) {
					doc.body = {sections: model, formInfo: info};

					vm.db.put(doc, function (res) {
						deferred.resolve(res);
					});
				}, function (error) {
					if (404 === error.status) {
						var doc = {
							_id: 'draft:' + info.rawData.template.id,
							type: 'draft',
							name: info.name,
							body: {sections: model, formInfo: info}
						};
						vm.db.put(doc, function (res) {
							deferred.resolve(res);
						});
					}
				});
				//}
				return deferred.promise;
			}

			function createDesignDoc(db) {
				// create a design doc
				var designDoc = designDoc;
				// get/set design
				function putDoc(created) {
					db.post(designDoc).then(function (res) {
						$log.debug('design Doc '+created+', ', res.rev);
					}, function (err) {
						if (err.status !== 409)
							$log.error('design Doc put failed, ', err);
					});
				}

				db.get('_design/index').then(function (doc) {
					if (!_.isEqual(_.omit(doc, '_rev'), designDoc)) { // check if docs are equal to not update on every page refresh
						designDoc._rev = doc._rev;
						putDoc('created');
					}
				}, function () {
					putDoc('updated');
				});
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
			function init() {
				vm.user = localStorageService.get('user');
				vm.db = pouchDB(vm.user.id);
				vm.serv.__proto__ = vm.db;
				createDesignDoc(vm.db);
			};
			vm.serv = {
				init: init,
				syncOnline: syncOnline,
				addDraft: addDraft,
				getAllTasks: getAllTasks,
				getAllTemplates: getAllTemplates,
				getUserTemplates: getUserTemplates,
				getReferences: getReferences,
				getPatients: getPatients,
				getStaff: getStaff,
				getTask: getTask,
				sendTask: sendTask,
				loadTask: loadTask,
				editTask: editTask
			}
			return vm.serv;
		})
})();
