/**
 * Created by rihdus on 29/11/15.
 */

;
(function () {
	"use strict";

	angular.module('kitchen-sink.list', ['kitchen-sink'])
		.config(['$stateProvider', 'ModulesProvider',
			function ($stateProvider, ModulesProvider) {

				$stateProvider.state('app.list', {
					url: '/list-template',
					templateUrl: 'src/kitchen-sink/list/list.templates.view.html'
				});

				ModulesProvider.addModule('list', {
					displayText: "List Items",
					group: "Templates",
					url: "#/app/list-template",
					path: "app.list"
				});

			}])

})();