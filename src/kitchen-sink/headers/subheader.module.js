/**
 * Created by rihdus on 5/12/15.
 */

;
(function () {
	"use strict";

	angular.module('kitchen-sink.headers', ['kitchen-sink'])
		.config(['$stateProvider', 'ModulesProvider',
			function ($stateProvider, ModulesProvider) {

				$stateProvider.state('app.subHeader', {
					url: '/sub-header',
					templateUrl: 'src/kitchen-sink/headers/sub-header.template.html'
				});

				ModulesProvider.addModule('subHeader', {
					displayText: "Sub Header",
					group: "Templates",
					url: "#/app/sub-header",
					path: "app.subHeader"
				});

			}])

})();