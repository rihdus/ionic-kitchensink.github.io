/**
 * Created by rihdus on 29/11/15.
 */

;
(function () {
	"use strict";

	angular.module('kitchen-sink', [])
		.provider('Modules', function () {

			var modules = [];

			return {
				addModule: function addModule(name, config) {
					modules.push({
						name: name,
						config: config
					})
				},
				$get: [function () {

					var rootModules = _.filter(modules, function (module) {
						return !module.config.group;
					});

					_.remove(modules, function (module) {
						return !module.config.group;
					});

					var moduleGroups = _.groupBy(modules, function (module) {
						return module.config.group
					});

					return {
						getAll: function () {
							return _.filter(modules, function(module) {return !module.config.group})
						},
						getModuleGroups: function() {
							return moduleGroups;
						},
						rootModules: rootModules
					}
				}]
			}

		})

})();