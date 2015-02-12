/**
 * @class build.mvc.controller.UserController
 * @extends build.mvc.controller.Controller
 */
Build('build.mvc.controller.UserController', [ 'buildnode::build.mvc.controller.Controller', 'buildnode::build.mvc.model.UserModel' ], function($define, $super) {
	$define({
		$extends : 'build.mvc.controller.Controller',
		/**
		 * @constructor
		 */
		$constructor : function UserController(app) {
			$super(this)(app);
			this.userModel = new build.mvc.model.UserModel(app.database.mongoose);
			this.index = this.route({
				verb : 'all',
				route : '/user',
				permission : null,
				restful : false,
				method : function(request, response) {
					var layoutData = {};
					layoutData.title = "Users";
					var data = {
						layout : "layout",
						title : 'Users',
						data : "Users"
					// empty: undefined
					};
					response.render('user/index', data);
				}
			});
			this.get = this.route({
				verb : 'get',
				route : '/api/user',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					if (request.query.id) {
						this.userModel.model.findOne({
							_id : request.query.id
						}, function(err, user) {
							output(user);
						});
					} else {
						this.userModel.model.find({}, function(err, data) {
							output(data);
						});
					}
				}
			});
			this.getByUsername = this.route({
				verb : 'get',
				route : '/api/user/getByUsername',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					this.userModel.model.findOne({
						username : request.query.username
					}, function(err, user) {
						output(user);
					});
				}
			});
			this.search = this.route({
				verb : 'get',
				route : '/api/user/search',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					var limit = request.query.limit || 10;
					var index = request.query.index || 0;
					this.userModel.model.count({}, function(err, count) {
						this.userModel.model.find({}).sort({
							'_id' : 'asc'
						}).skip(index * limit).limit(limit).exec(function(err, users) {
							// for ( var x = 0; x < users.length; x++) {
							// var user = users[x];
							// }
							output({
								count : count,
								result : users
							});
						});
					});
				}
			});
			this.post = this.route({
				verb : 'post',
				route : '/api/user',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					var user = this.userModel.model(request.body);
					user.save(function(err) {
						console.log(request.body);
						output(user);
					});
				}
			});
			// This is a conflicted route
			this.put = this.route({
				verb : 'put',
				route : '/api/user',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					console.log(request.query.id);
					console.log(request.body);
					if (request.body._id) {
						delete request.body._id;
					}
					this.userModel.model.findOneAndUpdate({
						_id : request.query.id
					}, request.body, function(err, result) {
						if (err) {
							output({
								success : false
							});
						} else {
							output({
								success : true
							});
						}
					});
				}
			});
			this.del = this.route({
				verb : 'delete',
				route : '/api/user',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					this.userModel.model.remove({
						_id : request.query.id
					}, function(err, result) {
						output({
							result : result
						});
					});
				}
			});
		}
	});
});

/*
 * browse : this.route({ verb : 'get', route : '/api/user', permission :
 * 'isLoggedIn', restful : true, method : function(request, response, output) {
 * var userModel = system.models.userModel; // var pageNumber =
 * request.params.pageNumber; // pageNumber = parseInt(pageNumber); // if
 * (!pageNumber || isNaN(pageNumber)) { // pageNumber = 0; // } //
 * data.pageNumber = pageNumber; // var pageSize = 3; // data.pageSize =
 * pageSize; // var userModel = system.models.userModel; //
 * userModel.getAllCount(function(err, numUsers) { // if (err) { //
 * output.errors.push(err); // } // data.numUsers = numUsers; //
 * userModel.getPage(pageNumber, pageSize, function(err, users) // { // if (err) { //
 * output.errors.push(err); // } // data.users = users; // output.data = data; //
 * response.send(JSON.stringify(output)); // }); // }); } }),
 */