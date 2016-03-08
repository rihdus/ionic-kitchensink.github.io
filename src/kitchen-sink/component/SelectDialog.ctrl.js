/**
 * Created by rihdus on 6/3/16.
 */

;(function () {

	function SelectDialogController($scope, $dialog, locals) {
		"use strict";
		angular.extend($scope, locals, {
			onItemSelect: function (item) {
				$dialog.close(item);
			}
		})
	}

	SelectDialogController.$inject = ['$scope', '$dialog', 'locals'];

	angular.module('kitchen-sink.components')
		.controller('SelectDialogController', SelectDialogController)

})();