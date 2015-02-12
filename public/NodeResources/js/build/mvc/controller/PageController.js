/**
 * @class build.mvc.controller.PageController
 * @extends build.mvc.controller.Controller
 */
Build('build.mvc.controller.PageController', [ 'buildnode::build.mvc.controller.Controller', 'buildnode::build.mvc.model.PageModel' ], function($define, $super) {
	$define({
		$extends : 'build.mvc.controller.Controller',
		/**
		 * @constructor
		 */
		$constructor : function PageController(app) {
			$super(this)(app);
			this.pageModel = new build.mvc.model.PageModel(app.database.mongoose);
			this.index = this.route({
				verb : 'all',
				route : '/page',
				permission : null,
				restful : false,
				method : function(request, response) {
					var layoutData = {};
					layoutData.title = "Pages";
					var data = {
						layout : "layout",
						title : 'Pages',
						data : "Pages"
					// empty: undefined
					};
					response.render('page/index', data);
				}
			});
			this.get = this.route({
				verb : 'get',
				route : '/api/page',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					if (request.query.id) {
						this.pageModel.model.findOne({
							_id : request.query.id
						}, function(err, user) {
							output(user);
						});
					} else {
						this.pageModel.model.find({}, function(err, data) {
							output(data);
						});
					}
				}
			});
			this.getByPageroute = this.route({
				verb : 'get',
				route : '/api/page/getByPageroute',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					this.pageModel.model.findOne({
						route : request.query.route
					}, function(err, user) {
						output(user);
					});
				}
			});
			this.search = this.route({
				verb : 'get',
				route : '/api/page/search',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					var limit = request.query.limit || 10;
					var index = request.query.index || 0;
					this.pageModel.model.count({}, function(err, count) {
						this.pageModel.model.find({}).sort({
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
				route : '/api/page',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					var user = this.pageModel.model(request.body);
					user.save(function(err) {
						console.log(request.body);
						output(user);
					});
				}
			});
			// This is a conflicted route
			this.put = this.route({
				verb : 'put',
				route : '/api/page',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					console.log(request.query.id);
					console.log(request.body);
					if (request.body._id) {
						delete request.body._id;
					}
					this.pageModel.model.findOneAndUpdate({
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
				route : '/api/page',
				permission : null,
				restful : true,
				method : function(request, response, output) {
					this.pageModel.model.remove({
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
 * var pageModel = system.models.pageModel; // var pageNumber =
 * request.params.pageNumber; // pageNumber = parseInt(pageNumber); // if
 * (!pageNumber || isNaN(pageNumber)) { // pageNumber = 0; // } //
 * data.pageNumber = pageNumber; // var pageSize = 3; // data.pageSize =
 * pageSize; // var pageModel = system.models.pageModel; //
 * pageModel.getAllCount(function(err, numUsers) { // if (err) { //
 * output.errors.push(err); // } // data.numUsers = numUsers; //
 * pageModel.getPage(pageNumber, pageSize, function(err, users) // { // if (err) { //
 * output.errors.push(err); // } // data.users = users; // output.data = data; //
 * response.send(JSON.stringify(output)); // }); // }); } }),
 */