;
(function () {
	"use strict";
	angular.module('ionic-kitchen-sink', [
		'ionic',
		'ionic-kitchen-sink.controllers',
		'kitchen-sink',
		'kitchen-sink.list',
		'kitchen-sink.tabs',
		'kitchen-sink.headers',
		'kitchen-sink.search-select',
		'kitchen-sink.alphaScroll',
		'kitchen-sink.dialog',
		'kitchen-sink.components'

	])

		.run(function ($ionicPlatform) {
			$ionicPlatform.ready(function () {
				// Hide the accessory bar by default (remove this to show the accessory bar above
				// the keyboard for form inputs)
				if (window.cordova && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);

				}
				if (window.StatusBar) {
					// org.apache.cordova.statusbar required
					StatusBar.styleDefault();
				}
			});
		})

		.config(function ($stateProvider, $urlRouterProvider) {
			$stateProvider

				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'src/app/app-root.container.view.html',
					controller: 'AppRootCtrl'
				})
				.state('app.nav', {
					url: '/nav',
					abstract: true,
					templateUrl: 'src/app/app-nav.container.html'
				})
				.state('app.nav.info', {
					url: '/info',
					templateUrl: 'src/app/info/info.view.html'
				})
			;
			// if none of the above states are matched, use this as the fallback
			$urlRouterProvider.otherwise('/app/nav/info');
		});

})();