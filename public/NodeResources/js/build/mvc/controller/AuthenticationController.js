module.exports = function(Build) {
	Build('build.mvc.controller.AuthenticationController', [ 'buildnode::build.mvc.controller.Controller', 'buildnode::build.mvc.model.UserModel' ], function(define, $super, merge) {
		define({
			$constructor : function(app) {
				$super(this)(app);
				this.userModel = new build.mvc.model.UserModel(app.database.mongoose);
				this.index = route({
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
				this.login = route({
					verb : 'post',
					route : '/api/authentication/login',
					permission : null,
					restful : true,
					method : function(request, response, output) {
						console.log(request.body);
						var data = {};
						this.userModel.model.findOne({
							username : request.body.username
						}, function(err, user) {
							if (user && user.password == request.body.password) {
								data.success = true;
								request.session.user = user;
							} else {
								request.session.user = undefined;
								data.success = false;
							}
							data.user = user;
							output(data);
						});
					}
				});
				this.logout = route({
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
				this.user = route({
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