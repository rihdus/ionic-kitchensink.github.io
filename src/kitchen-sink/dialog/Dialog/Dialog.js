/**
 * Created by sudhir on 10/2/16.
 */

;(function () {
	"use strict";

	function DialogService($q, $timeout, $rootScope,
	                       $controller, $ionicPopup) {

		var POPUP_PARAMS = [
			'title',
			'cssClass',
			'subTitle',
			'template',
			'templateUrl',
			'scope',
			'buttons'
		]
			, DIALOG_PARAMS = ['controller', 'locals'];

		defaultDialogController.$inject = ['$scope', 'locals', '$mdDialog'];

		var DialogService = {
			showAlert: showAlert,
			alert: showAlert,
			showConfirm: showConfirm,
			confirm: showConfirm,
			show: show,
			showSearchSelector: showSearchSelector
		};

		return DialogService;

		/**
		 *
		 * @param config
		 * - title: String
		 * - cssClass: String
		 * - subTitle: String
		 * - template: String
		 * - templateUrl: String of the dialog body
		 * - scope: parent scope
		 * - buttons: Array of dialog button objects with keys [text, type, onTap]
		 *
		 * - controller: Injectable controller for the template
		 * - locals: Objects to be passed in to the controller
		 *
		 * @returns {*|d.promise|promise}
		 */
		function show(config) {
			var _config = config || {};
			var popupParams = _.pick(_config, POPUP_PARAMS);
			var deferred = $q.defer();
			var scope = _config.scope || $rootScope;
			var $dialog = {
				cancel: close,
				hide: close
			};
			var popOverHandle = null;

			popOverHandle = $ionicPopup.show(_config);
			popOverHandle.then(function (result) {
					deferred.resolve(result)
				}, null, function () {

				})
				.catch(function (err) {
					deferred.reject(err);
				})
			;

			return deferred.promise;

			function close(result) {
				popOverHandle.close(result);
			}
		}

		function showAlert() {
			var deferred = $q.defer();
			$ionicPopup.alert.apply(this, arguments)
				.then(function (res) {
					deferred.resolve(res);
				})
				.catch(function (err) {
					console.error('alert dialog open fail', err);
					deferred.reject(err);
				})
			;
			return deferred.promise;
		}

		function showConfirm() {
			var deferred = $q.defer();
			$ionicPopup.confirm.apply(this, arguments)
				.then(function (res) {
					if (res) {
						deferred.resolve(res);
					} else {
						deferred.reject();
					}
				})
				.catch(function (err) {
					console.error('confirm dialog open fail', err);
					deferred.reject(err);
				})
			;
			return deferred.promise;
		}

		function showSearchSelector() {
		}

		function defaultDialogController($scope, locals, $mdDialog) {
			angular.extend($scope, locals || {}, {
				$mdDialog: $mdDialog
			});
		}

	}

	DialogService.$inject = ['$q', '$timeout', '$rootScope',
		'$controller', '$ionicPopup'];

	angular.module('ionic.component.dialog', ['ionic'])
		.service('Dialog', DialogService)

})();