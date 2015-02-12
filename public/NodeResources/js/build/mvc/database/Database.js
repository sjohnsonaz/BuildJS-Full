var fs = require('fs');
var path = require('path');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Server = mongo.Server;
var Db = mongo.Db;
module.exports = function(Build) {
	/**
	 * @class build.mvc.database.Database
	 */
	Build('build.mvc.database.Database', [], function($define, $super) {
		$define({
			/**
			 * @constructor
			 */
			$constructor : function Database(host, port, database, username, password, mongooseConnection) {
				this.db = null;
				this.server = null;
				this.mongoose = mongoose;
				var self = this;
				this.init = function(callback) {
					var result = self.initMongo(host, port, database, username, password, function() {
						self.initMongoose(mongooseConnection, function() {
							typeof (callback) == 'function' ? callback() : false;
						});
					});
					self.db = result.db;
					self.server = result.server;
				};
			},
			$prototype : {
				initMongo : function(host, port, database, username, password, callback) {
					var server = new Server(host, port, {
						auto_reconnect : true
					});
					var db = new Db(database, server, {
						safe : false
					});
					db.open(function(error, db) {
						db.authenticate(username, password, function() {
							if (!error) {
								// mongoose.connect(db);
								console.log('Database connection success...');
								callback();
							} else {
								console.log('Database connection failure...');
							}
						});
					});
					return {
						server : server,
						db : db
					};
				},
				initMongoose : function(mongooseConnection, callback) {
					mongoose.connection.on("open", function() {
						console.log('Mongoose connection success...');
						callback();
					});
					mongoose.connect(mongooseConnection);
				}
			}
		});
	});
};