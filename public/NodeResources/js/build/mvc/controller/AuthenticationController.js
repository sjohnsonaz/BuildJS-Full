/**
 * @class build.mvc.controller.AuthenticationController
 * @extends build.mvc.controller.Controller
 */
module.exports = function(Build) {
	Build('build.mvc.controller.AuthenticationController', [ 'buildnode::build.mvc.controller.Controller', 'buildnode::build.mvc.model.UserModel' ], function($define, $super) {
		$define({
			$extends : 'build.mvc.controller.Controller',
			/**
			 * @constructor
			 */
			$constructor : function AuthenticationController(app) {
				$super(this)(app);
				this.userModel = new build.mvc.model.UserModel(app.database.mongoose);
				this.index = this.route({
					verb : 'all',
					route : '/authentication',
					permission : null,
					restful : false,
					method : function(request, response, output, data) {
						output('authentication/index', {
							layout : 'layout',
							title : 'Login',
							data : request.session.user ? request.session.user.username : ''
						});
					}
				});
				this.login = this.route({
					verb : 'post',
					route : '/api/authentication/login',
					permission : null,
					restful : true,
					method : function(request, response, output) {
						this.userModel.model.findOne({
							username : request.body.username
						}, function(err, user) {
							var data = {};
							if (user && user.password == request.body.password) {
								data.success = true;
								request.session.user = user;
							} else {
								request.session.user = undefined;
								data.success = false;
								data.message = 'Username or password is incorrect.';
							}
							data.user = user;
							output(data);
						});
					}
				});
				this.logout = this.route({
					verb : 'post',
					route : '/api/authentication/logout',
					permission : null,
					restful : true,
					method : function logout(request, response, output) {
						request.session.user = undefined;
						output({
							success : true
						});
					}
				});
				this.user = this.route({
					verb : 'get',
					route : '/api/authentication/user',
					permission : null,
					restful : true,
					method : function(request, response, output) {
						output({
							user : request.session.user
						});
					}
				});
			},
			$prototype : {

			}
		});
	});
};