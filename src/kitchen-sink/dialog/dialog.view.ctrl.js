/**
 * Created by rihdus on 3/3/16.
 */

;(function () {
	"use strict";

	function DialogViewController($scope, Dialog) {

		angular.extend($scope, {
			dialogCss: '',
			showAlert: function () {
				console.log($scope.dialogCss);
				Dialog.alert({
					cssClass: $scope.dialogCss,
					title: "Alert Dialog",
					content: "You just clicked on a alert button! Have a nice day.",
					okText: "Yea. Thanks. I know."
				})
			},
			showConfirm: function () {
				Dialog.confirm({
					cssClass: $scope.dialogCss,
					title: "Confirm Dialog",
					content: "Pick either one of the choices for your breakfast.",
					okText: "Apple Pie",
					cancelText: "Skip"
				})
			},
			showCustom: function () {
				Dialog.show({
					cssClass: $scope.dialogCss,
					title: "Custom Dialog",
					templateUrl: 'src/kitchen-sink/dialog/custom-dialog-content.tpl.html',
					controller: CustomDialogController,
					buttons: [
						{
							text: "Push",
							onTap: function (e) {

								// prevent dialog from closing..
								// e.preventDefault()
								// -----------------------------

								return true;
							}
						}
					],
					locals: {
						confirmButton: "Apples",
						confirmText: "I see you like apples.."
					}
				})
			}
		});

	}

	DialogViewController.$inject = ['$scope', 'Dialog'];

	function CustomDialogController($scope, locals, $dialog, Dialog) {
		angular.extend($scope, locals, {
			confirm: function () {
				Dialog.alert({
					content: locals.confirmText
				})
			}
		})
	}

	CustomDialogController.$inject = ['$scope', 'locals', '$dialog', 'Dialog'];

	angular.module('kitchen-sink.dialog', ['kitchen-sink', 'ionic.component.dialog'])
		.controller('CustomDialogController', CustomDialogController)
		.config(['$stateProvider', 'ModulesProvider',
			function ($stateProvider, ModulesProvider) {

				$stateProvider.state('app.dialogs', {
					url: '/dialogs',
					templateUrl: 'src/kitchen-sink/dialog/dialog.template.html',
					controller: DialogViewController
				});

			}])
	;

})();