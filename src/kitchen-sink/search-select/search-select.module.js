/**
 * Created by rihdus on 6/12/15.
 */


;
(function () {
	"use strict";

	angular.module('kitchen-sink.search-select', ['kitchen-sink', 'search-select'])
		.config(['$stateProvider', 'ModulesProvider',
			function ($stateProvider, ModulesProvider) {

				$stateProvider.state('app.searchSelect', {
					url: '/search-select',
					templateUrl: 'src/kitchen-sink/search-select/search-select.view.tpl.html',
					controller: 'SearchSelectViewController'
				});
			}])
		.controller('SearchSelectViewController', ['$scope', '$timeout', 'SearchSelect',
			function ($scope, $timeout, SearchSelect) {

				var peopleSearchSelector
					= SearchSelect.FullScreenSelector.create(findPeople);

				$scope.showSearchSelector = function (queryString) {
					peopleSearchSelector.setResults(["Person 1", "Person 2"]);
					peopleSearchSelector.showSearchSelector(queryString)
						.subject.subscribe(function (x) {
						console.log(x);
						$scope.selectedItem = x;
					}, function (y) {
						console.log(y);
					}, function () {
					})
					;
				};

				$scope.findPeople = findPeople;

				function findPeople(queryString) {
					return $timeout(function () {
						var results = [];
						for (var i = 0; i < 4; i++) {
							results.push(queryString + '-' + i)
						}
						return results;
					}, 10)
				}

			}])
		.directive('focusMe', function ($timeout) {
			return {
				link: function (scope, element, attrs) {

					$timeout(function () {
						element[0].focus();
					});
				}
			};
		})
	;

})();