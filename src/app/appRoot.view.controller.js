'use strict';

angular.module('ionic-kitchen-sink.controllers', [])

	.controller('AppRootCtrl', ['$scope', '$state', '$ionicHistory', 'Modules', '$timeout',
		function ($scope, $state, $ionicHistory, Modules, $timeout) {

			$scope.modules = Modules.getAll();
			$scope.groupModules = Modules.getModuleGroups();
			$scope.rootModules = Modules.rootModules;

			console.log(Modules.rootModules);

			$scope.transitionTo = function (path, args) {
				return $state.transitionTo(path, args)
			};

			$scope.resetViewTo = function (path, args) {
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});
				return $state.transitionTo(path, args);
			};

		}])
;