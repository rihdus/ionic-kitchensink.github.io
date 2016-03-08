/**
 * Created by rihdus on 5/3/16.
 */

;(function () {

	function ComponentViewController($scope, Modal, Dialog) {
		"use strict";

		angular.extend($scope, {
			showCustomModal: function () {
				Modal.show(new Modal.ModalConfig('src/kitchen-sink/component/template/customModal.tpl.html',
					{
						controller: ['$scope', '$modalService', 'locals', '$q', '$timeout',
							function ($scope, $modalService, locals, $q, $timeout) {
								angular.extend($scope, locals, {
									action_click: function () {
										$scope.submit()
											.then(function () {
												$modalService.getModalInstance().hide();
											});
									},
									submit: function () {
										$scope.loading = true;
										return $timeout(function () {
											$scope.loading = false;
										}, 2000)
									}
								})
							}
						],
						parentScope: $scope,
						locals: {
							title: "Custom Modal"
						}
					}))
			}
		});

		angular.extend($scope, {
			dialogStyleOptions: [
				{name: 'Ionic', value: 'popup-ionic'},
				{name: 'Material Design', value: 'popup-material'},
				{name: 'iOS', value: 'popup-ios'}
			],
			dialogStyle: {},
			showAlert: function (style) {
				Dialog.alert({
					cssClass: style,
					title: "Alert Dialog",
					content: "You just clicked on a alert button! Have a nice day.",
					okText: "Yea. Thanks. I know."
				})
			},
			showConfirm: function (style) {
				Dialog.confirm({
					cssClass: style,
					title: "Confirm Dialog",
					content: "Pick either one of the choices for your breakfast.",
					okText: "Apple Pie",
					cancelText: "Skip"
				})
			},
			showCustom: function (style) {
				Dialog.show({
					cssClass: style,
					title: "Custom Dialog",
					templateUrl: 'src/kitchen-sink/component/template/custom-dialog-content.tpl.html',
					controller: 'CustomDialogController',
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
			},
			showCustomSelect: function () {
				Dialog.show(
					{
						cssClass: 'popup-complex popup-select',
						title: "Choose your veggies",
						templateUrl: 'src/kitchen-sink/component/template/select.dialog.tpl.html',
						controller: 'SelectDialogController',
						buttons: [
							{
								text: 'Cancel',
								type: 'button-clear button-dark',
								onTap: function (e) {
									return true;
								}
							}
						],
						locals: {
							selectOptions: [
								{
									text: 'Apple: The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple',
									value: 'apple'
								},
								{
									text: 'Banana: The banana is an edible fruit, botanically a berry..',
									value: 'banana'
								},
								{
									text: 'Pineapple: The pineapple (Ananas comosus) is a tropical plant with edible multiple fruit consisting of coalesced berries',
									value: 'pineapple'
								},
								{
									text: 'Broccoli: Broccoli is an edible green plant in the cabbage family.',
									value: 'broccoli'
								},
								{
									text: 'Tomato: The tomato is the edible, often red berry-type fruit of the nightshade Solanum lycopersicum, commonly known as a tomato plant',
									value: 'tomato'
								}
							]
						}
					})
					.then(function (item) {
						console.log(item);
					})
			}
		});

	}

	ComponentViewController.$inject = ['$scope', 'Modal', 'Dialog'];

	angular.module('kitchen-sink.components', ['ionic', 'kitchen-sink',
			'app.component.modal',
			'ionic.popup.enhanced',
			'kitchen-sink.dialog',
			'kitchen-sink.search-select'
		])
		.config(['$stateProvider', 'ModulesProvider',
			function ($stateProvider, ModulesProvider) {
				"use strict";

				$stateProvider
					.state('app.components', {
						url: '/components',
						templateUrl: 'src/kitchen-sink/component/components.view.html',
						controller: ComponentViewController
					})
				;

				ModulesProvider.addModule('app.components', {
					displayText: 'Components',
					url: '#/app/components',
					path: 'app.components'
				})

			}
		])
	;

})();