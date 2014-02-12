Build('build.mvc.controller.TestController', [ 'node::build.mvc.controller.Controller', 'node::build.mvc.model.UserModel' ], function(define, $super) {
	define({
		$extends : 'build.mvc.controller.Controller',
		$constructor : function(app) {
			$super(this)(app);
			this.userModel = new build.mvc.model.UserModel();
			this.index = route({
				verb : 'all',
				route : '/user',
				permission : 'isLoggedIn',
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
			this.get = route({
				verb : 'get',
				route : '/api/user',
				permission : 'isLoggedIn',
				restful : true,
				method : function(request, response, output) {
					if (request.query.id) {
						this.UserModel.model.findOne({
							_id : request.query.id
						}, function(err, user) {
							output(user);
						});
					} else {
						this.UserModel.model.find({}, function(err, data) {
							output(data);
						});
					}
				}
			});
			this.getByUsername = route({
				verb : 'get',
				route : '/api/user/getByUsername',
				permission : 'isLoggedIn',
				restful : true,
				method : function(request, response, output) {
					this.UserModel.model.findOne({
						username : request.query.username
					}, function(err, user) {
						output(user);
					});
				}
			});
			this.search = route({
				verb : 'get',
				route : '/api/user/search',
				permission : 'isLoggedIn',
				restful : true,
				method : function(request, response, output) {
					var limit = request.query.limit || 10;
					var index = request.query.index || 0;
					this.UserModel.model.count({}, function(err, count) {
						this.UserModel.model.find({}).sort({
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
			this.post = route({
				verb : 'post',
				route : '/api/user',
				permission : 'isLoggedIn',
				restful : true,
				method : function(request, response, output) {
					var user = this.UserModel.model.UserModel(request.body);
					user.save(function(err) {
						console.log(request.body);
						output(user);
					});
				}
			});
			// This is a conflicted route
			this.put = route({
				verb : 'put',
				route : '/api/user',
				permission : 'isLoggedIn',
				restful : true,
				method : function(request, response, output) {
					console.log(request.query.id);
					console.log(request.body);
					if (request.body._id) {
						delete request.body._id;
					}
					this.UserModel.model.findOneAndUpdate({
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
			this.del = route({
				verb : 'delete',
				route : '/api/user',
				permission : 'isLoggedIn',
				restful : true,
				method : function(request, response, output) {
					this.UserModel.model.remove({
						_id : request.body.id
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
 * browse : route({ verb : 'get', route : '/api/user', permission :
 * 'isLoggedIn', restful : true, method : function(request, response, output) {
 * var UserModel = system.models.UserModel; // var pageNumber =
 * request.params.pageNumber; // pageNumber = parseInt(pageNumber); // if
 * (!pageNumber || isNaN(pageNumber)) { // pageNumber = 0; // } //
 * data.pageNumber = pageNumber; // var pageSize = 3; // data.pageSize =
 * pageSize; // var UserModel = system.models.UserModel; //
 * UserModel.getAllCount(function(err, numUsers) { // if (err) { //
 * output.errors.push(err); // } // data.numUsers = numUsers; //
 * UserModel.getPage(pageNumber, pageSize, function(err, users) // { // if (err) { //
 * output.errors.push(err); // } // data.users = users; // output.data = data; //
 * response.send(JSON.stringify(output)); // }); // }); } }),
 */