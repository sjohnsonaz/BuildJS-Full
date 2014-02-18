var mongoose = require('mongoose');
module.exports = function(Build) {
	Build('build.mvc.model.UserModel', [ 'buildnode::build.mvc.model.MongooseModel' ], function(define, $super) {
		define({
			$extends : 'build.mvc.model.MongooseModel',
			$constructor : function() {
				$super(this)();
				this.schema = new mongoose.Schema({
					username : String,
					password : String,
					firstName : String,
					lastName : String
				});
				this.schema.index({
					username : 1
				});
				this.schema.set('autoIndex', false);
				this.model = mongoose.model('User', this.schema);
			},
		});
	});
};