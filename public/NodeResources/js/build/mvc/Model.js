var fs = require('fs');
var path = require('path');
module.exports = function(system) {
	system.models = {};
	return {
		loadModels : function(basePath) {
			var self = this;
			var files = fs.readdirSync(basePath);
			for (x in files) {
				var file = files[x];
				if (path.extname(file) == '.js') {
					var modelName = path.basename(file, '.js');
					var modelPath = basePath + '/' + file;
					self.load(modelName, modelPath);
				}
			}
		},
		load : function(modelName, modelPath) {
			var model = require(modelPath);
			/*
			 * var connect = function(name, db, success, error) {
			 * db.collection(name, function(err, collection) { if (!err) {
			 * success(collection); } else { console.log('Database collection
			 * "User" not found...'); error(err); } }); };
			 */
			var define = function(definition) {
				system.models[modelName] = definition;
				console.log('Added model:  ' + modelName);
			};
			model(system, define);
		}
	};
};