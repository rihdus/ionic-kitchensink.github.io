/**
 * Created by rihdus on 6/3/16.
 */

;(function () {

	function $ionicPopupDecorator($delegate, $controller, $rootScope) {
		"use strict";

		var DIALOG_PARAMS = ['controller', 'locals', 'scope']
			;

		var $ionicPopupFunctions = ['show', 'alert', 'confirm', 'prompt'];
		var $ionicPopup = $delegate;
		var $enhancedIonicPopup = {};

		angular.extend($enhancedIonicPopup, $ionicPopup, {
			show: makePopupDecorator('show'),
			alert: makePopupDecorator('alert'),
			confirm: makePopupDecorator('confirm'),
			prompt: makePopupDecorator('prompt')
		});

		return $enhancedIonicPopup;

		function makePopupDecorator(fnName) {
			return function (config) {
				var _config = config || {}
					, controllerOptions = _.pick(_config, DIALOG_PARAMS)
					, $dialog = {
						close: close
					}
					;

				/*
				*
				* Inject controller for the popup with the following additional injectables.
				*
				* - locals:   A simple javascript object that can be injected into the controller.
				* - $dialog:  A service with a `close` function that can used to close
				*             the dialog form within the controller.
				*
				* */
				if (controllerOptions.controller) {
					var scope = controllerOptions.scope || $rootScope;

					$controller(controllerOptions.controller, angular.extend({},
						_config.locals,
						{
							locals: _config.locals,
							$scope: scope,
							$dialog: $dialog
						}
					));
				}

				var popupPromise = $ionicPopup[fnName](_config);

				return popupPromise;

				function close(result) {
					popupPromise.close(result);
				}
			};
		}
	}

	$ionicPopupDecorator.$inject = ['$delegate', '$controller', '$rootScope'];

	function defaultPopupController($scope, locals, $popup) {
		angular.extend($scope, locals || {}, {
			$popup: $popup
		});
	}

	angular.module('ionic.popup.enhanced', ['ionic'])
		.decorator('$ionicPopup', $ionicPopupDecorator)

})();