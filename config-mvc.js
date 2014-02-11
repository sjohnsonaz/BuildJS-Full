module.exports = {
	port : 9001,
	staticPath : __dirname + '/public',
	staticDirectory : '',
	viewPath : __dirname + '/views',
	controllerPath : __dirname + '/controllers',
	modelPath : __dirname + '/models',
	permissionPath : __dirname + '/permissions',
	helperPath : __dirname + '/helpers',
	widgetPath : __dirname + '/widgets',
	uploadPath : __dirname + '/public/uploads',
	icon : __dirname + '/public/favicon.ico',
	session : {
		database : {
			collection : 'session',
			url : 'mongodb://localhost:27017/testdb',
			username : 'simpleMVC',
			password : 'test'
		},
		cookieSecret : 'your secret here',
		maxAge : 300000
	},
	defaultController : 'MainController',
	errorController : 'ErrorController',

	mongooseConnection : 'mongodb://localhost:27017/testdb',// 'mongodb://user:pass@localhost:port/database',
	mongooseOptions : {
		db : {
			native_parser : true,
			safe : true
		}
	},

	mongodb : {
		host : 'localhost',
		port : 27017,
		database : 'testdb',
		username : 'simpleMVC',
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