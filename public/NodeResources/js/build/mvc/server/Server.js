module.exports = function(Build) {
	/**
	 * @class build.mvc.server.Server
	 */
	Build('build.mvc.server.Server', [], function(define, $super) {
		define({
			/**
			 * @constructor
			 */
			$constructor : function Server(config) {
				this.config = config;
				this.controllers = [];
			},
			$prototype : {
				start : function(callback) {
				},
				addController : function(controller) {
					this.controllers.push(controller);
				},
				addControllers : function(app, controllers) {
					for (var index = 0, length = controllers.length; index < length; index++) {
						var controller = controllers[index];
						if (typeof controller == 'string') {
							controller = eval(controller);
						}
						if (typeof controller == 'function') {
							this.controllers.push(new controller(app));
						}
					}
				}
			},
			$static : {

			}
		});
	});
};