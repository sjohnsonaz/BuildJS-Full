module.exports = function(Build) {
	Build('build.mvc.server.Server', [], function(define, $super) {
		define({
			$constructor : function(config) {
				this.config = config;
				this.controllers = [];
			},
			$prototype : {
				start : function(callback) {
				},
				addController : function(controller) {
					this.controllers.push(controller);
				}
			},
			$static : {

			}
		});
	});
};