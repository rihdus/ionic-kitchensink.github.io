/**
 * Created by rihdus on 1/12/15.
 */

;
(function () {
	"use strict";

	angular.module('kitchen-sink.tabs', ['kitchen-sink'])
		.config(['$stateProvider', 'ModulesProvider',
			function ($stateProvider, ModulesProvider) {

				$stateProvider.state('app.slidingTab', {
					abstract: true,

					url: '/sliding-tab',
					templateUrl: 'src/kitchen-sink/tabsNavigation/slidingTab.template.html'
				});

				$stateProvider.state('app.slidingTab.homeTab', {
					url: '/home-tab',
					views: {
						'home-tab': {
							templateUrl: 'src/kitchen-sink/tabsNavigation/home-sliding-tab.html'
						}
					}
				});

				$stateProvider.state('app.slidingTab.favTab', {
					url: '/fav-tab',
					views: {
						'fav-tab': {
							templateUrl: 'src/kitchen-sink/tabsNavigation/fav-tab.html'
						}
					}
				});

				$stateProvider.state('app.slidingTab.settingsTab', {
					url: '/settings-tab',
					views: {
						'settings-tab': {
							templateUrl: 'src/kitchen-sink/tabsNavigation/settings-tab.html'
						}
					}
				});

				$stateProvider.state('app.slidingTab.codeTab', {
					url: '/code-tab',
					views: {
						'code-tab': {
							templateUrl: 'src/kitchen-sink/tabsNavigation/mixture-tab.html'
						}
					}
				});

				ModulesProvider.addModule('slidingTabs-homeTab', {
					displayText: "Sliding Tabs",
					group: "Views Artifacts and Layout",
					url: "#/app/sliding-tab/home-tab",
					path: "app.slidingTab.homeTab"
				});

			}])

})();