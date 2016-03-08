/**
 * Created by rihdus on 12/12/15.
 */

;(function() {
	"use strict";

	angular.module('kitchen-sink.alphaScroll', ['kitchen-sink', 'rihdus.ionAlphaScroll'])
		.config(['$stateProvider', 'ModulesProvider',
			function ($stateProvider, ModulesProvider) {

				$stateProvider.state('app.alphaScroll', {
					url: '/alpha-scroll',
					templateUrl: 'src/kitchen-sink/alpha-scroll/alpha-scroll.view.html',
					controller: ['$scope', '$timeout',
						function ($scope, $timeout) {

							$scope.list = [];
							$scope.indices = [];
							for(var i=65; i<91; i++) {
								var char = String.fromCharCode(i);
								$scope.indices.push({
									id: ''+i,
									char: char
								});
								$scope.list.push({
									id: ""+i,
									name: char+"1",
									desc: "Description - "+char+" 1"
								})
							}

						}]
				});

				ModulesProvider.addModule('alphaScroll', {
					displayText: "Alpha Scroll",
					group: "Views Artifacts and Layout",
					url: "#/app/alpha-scroll",
					path: "app.alphaScroll"
				});

			}])

})();