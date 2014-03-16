module.exports = function(Build) {
	Build('build.mvc.model.UserModel', [ 'buildnode::build.mvc.model.MongooseModel' ], function(define, $super) {
		define({
			$extends : 'build.mvc.model.MongooseModel',
			$constructor : function(mongoose) {
				$super(this)(mongoose);
				this.schema = new mongoose.Schema({
					username : {
						type : String,
						lowercase : true,
						trim : true,
						required : true,
						unique : true
						//validate : [ validators.notEmpty, 'Username is empty' ]
					},
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
			$singleton : true
		});
	});
};