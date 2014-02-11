var fs = require('fs');
var path = require('path');
module.exports = function(Build) {
	Build('build.mvc.Permission', [], function(define, $super) {
		define({
			$constructor : function() {

			},
			$static : {
				loadPermissions : function(basePath) {
					var self = this;
					var files = fs.readdirSync(basePath);
					for (x in files) {
						var file = files[x];
						if (path.extname(file) == '.js') {
							var permissionName = path.basename(file, '.js');
							var permissionPath = basePath + '/' + file;
							self.load(permissionName, permissionPath);
						}
					}
				},
				load : function(permissionName, permissionPath) {
					var permission = require(permissionPath);
					var define = function(name, definition) {
						system.permission[name] = definition;
						console.log('Added permission:  ' + permissionName);
					};
					permission(system, define);
				}
			}
		});
	});
};