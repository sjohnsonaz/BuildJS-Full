Build('build.mvc.controller.TestController', [ 'buildnode::build.mvc.controller.Controller' ], function(define, $super) {
	define({
		$extends : 'build.mvc.controller.Controller',
		$constructor : function(app) {
			$super(this)(app);
			this.index = this.route({
				verb : 'all',
				route : '/test',
				permission : null,// 'isLoggedIn',
				restful : false,
				method : function(request, response, output, data) {
					output('test/index', data);
				}
			});
			this.rest = this.route({
				verb : 'all',
				route : '/test/rest',
				permission : null,// 'isLoggedIn',
				restful : true,
				method : function(request, response, output) {
					output({
						value : 123
					});
				}
			});
		}
	});
});