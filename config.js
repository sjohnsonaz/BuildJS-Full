module.exports = {
	port : 9006,
	staticPaths : [ {
		local : __dirname + '/public',
		virtual : ''
	} ],
	Build : {
		frontend : {
			paths : {
				main : '',
				build : '',
				demo : ''
			}
		},
		backend : {
			paths : {
				main : __dirname + '/public/Resources/js/',
				buildnode : __dirname + '/public/NodeResources/js/',
				demo : __dirname + '/public/DemoResources/js/'
			}
		}
	},
	viewPath : __dirname + '/views',
	controllers : [ 'build.mvc.controller.TestController', 'build.mvc.controller.UserController', 'build.mvc.controller.AuthenticationController', 'build.mvc.controller.PageController' ],
	controllerPath : __dirname + '/controllers',
	modelPath : __dirname + '/models',
	permissionPath : __dirname + '/permissions',
	helperPath : __dirname + '/helpers',
	widgetPath : __dirname + '/widgets',
	uploadPath : __dirname + '/public/uploads',
	icon : __dirname + '/public/favicon.png',
	session : {
		database : {
			collection : 'session',
			url : 'mongodb://localhost:27017/buildjs',
			username : 'simpleMVC',
			password : 'test'
		},
		cookieSecret : 'your secret here',
		maxAge : 300000
	},
	defaultController : 'MainController',
	errorController : 'ErrorController',

	mongooseConnection : 'mongodb://localhost:27017/buildjs',// 'mongodb://user:pass@localhost:port/database',
	mongooseOptions : {
		db : {
			native_parser : true,
			safe : true
		}
	},

	mongodb : {
		host : 'localhost',
		port : 27017,
		database : 'buildjs',
		username : 'buildjs',
		password : 'test'
	},

	concurrency : {
		active : true,
		minThreads : 1,
		maxThreads : 8
	},

	imageUpload : {
		rename : false,
		resize : true,
		sizes : [ {
			width : 640,
			height : 480
		} ],
		conversion : 'png'
	}
};