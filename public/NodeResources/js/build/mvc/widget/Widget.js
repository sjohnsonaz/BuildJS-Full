var fs = require('fs');
var path = require('path');
module.exports = function(Build) {
	/**
	 * @class build.mvc.widget.Widget
	 */
	Build('build.mvc.wiget.Widget', [], function($define, $super) {
		$define({
			/**
			 * @constructor
			 */
			$constructor : function Widget() {

			},
			$prototype : {
				render : function(request, response, data) {
				}
			},
			$static : {
				loadWidgets : function(basePath) {
					var self = this;
					var files = fs.readdirSync(basePath);
					for (x in files) {
						var file = files[x];
						if (path.extname(file) == '.js') {
							var widgetName = path.basename(file, '.js');
							var widgetPath = basePath + '/' + file;
							self.load(widgetName, widgetPath);
						}
					}
				},
				load : function(widgetName, widgetPath) {
					var widget = require(widgetPath);
					var render = function(location, data, callback) {
						fs.readFile(system.config.viewPath + location + '.ejs', function(err, fileData) {
							if (err) {
								typeof (callback) == 'function' ? callback(err) : false;
							} else {
								typeof (callback) == 'function' ? callback(null, ejs.render(fileData, data)) : false;
							}
						});
					};
					var define = function(name, definition) {
						system.helpers[name] = definition;
						console.log('Added widget:  ' + widgetName);
					};
					widget(system, define, render);
				}
			}
		});
	});
};