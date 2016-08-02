(function () {

	angular.module('modules.core')
		.config(function ($stateProvider, statesList, $urlMatcherFactoryProvider) {

			$stateProvider.decorator('state', function (state) {
				var moduleName = state.name.split('.'),
					moduleNameStripped = state.name.split('.'),
					mainViewName = 'content@main',
					dashboardViewName = 'forms@dashboard';

				moduleNameStripped.pop();

				function moduleToCtrl(name, secondName) {
					if (secondName)
						return name + secondName.charAt(0).toUpperCase() + secondName.substr(1).toLowerCase() + 'Ctrl as vm';
					else
						return name + 'Ctrl as vm';
				};

				function isMainView(moduleName) {
					return (moduleName.indexOf('auth') > -1) || ('main.dashboard' === moduleName);
				};
				function isAbs(moduleName) {
					return 'main.dashboard' === moduleName;
				};

				function configEditor() {
					//editor info
					state.url = state.url || $urlMatcherFactoryProvider.compile('/' + moduleName[2] + '_' + moduleName[3]);
					state.views[dashboardViewName] = {
						templateUrl: 'modules/' + moduleName[1] + '/' + moduleName[2] + '/views/' + moduleName[3] + '.html',
						controller: moduleToCtrl(moduleName[2], moduleName[3]),
						parent: moduleNameStripped.join('.')
					}
				}

				function configList() {
					//lists auth
					var ctrl = isAbs(moduleName.join('.')) ? moduleName[1] : moduleName[2],
						core = isAbs(moduleName.join('.')) ? 'core' : moduleName[2],
						viewName = isMainView(moduleName.join('.')) ? mainViewName : dashboardViewName;

					state.url = state.url || $urlMatcherFactoryProvider.compile('/' + ctrl);
					state.views[viewName] = {
						templateUrl: ['modules/', moduleName[1],'/', core,
							'/views/', ctrl, '.html'].join(''),
						controller: moduleToCtrl(ctrl),
						parent: moduleNameStripped.join('.')
					}
				}
				if ((_.intersection(['editor','info'], moduleName).length > 0) || (state.name.indexOf('main.dashboard.user.') > -1)){
					configEditor();
				}
				 else
				if (((state.name.indexOf('main.dashboard') > -1) && (state.name.indexOf('main.dashboard.user') === -1))||(state.name.indexOf('main.auth.') > -1)) {
					//auth
					configList();
				}
				if (!state.self.url) {
					state.self['url'] = state.url.source;
					state.navigable = state;
				}
				return state;

			});
			// get state names and send thrue stateProvider
			angular.forEach(statesList, function (state) {
				$stateProvider.state(state.name, state);
			});
		})
})();