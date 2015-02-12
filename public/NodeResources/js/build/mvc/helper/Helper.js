var fs = require('fs');
var path = require('path');
module.exports = function(Build) {
	/**
	 * @class build.mvc.Helper
	 */
	Build('build.mvc.Helper', [], function($define, $super) {
		$define({
			/**
			 * @constructor
			 */
			$constructor : function Helper() {

			},
			$static : {
				loadHelpers : function(basePath) {
					var self = this;
					var files = fs.readdirSync(basePath);
					for (x in files) {
						var file = files[x];
						if (path.extname(file) == '.js') {
							var helperName = path.basename(file, '.js');
							var helperPath = basePath + '/' + file;
							self.load(helperName, helperPath);
						}
					}
				},
				load : function(helperName, helperPath) {
					var helper = require(helperPath);
					var define = function(name, definition) {
						system.helpers[name] = definition;
						console.log('Added helper:  ' + helperName);
					};
					helper(system, define);
				}
			}
		});
	});
};