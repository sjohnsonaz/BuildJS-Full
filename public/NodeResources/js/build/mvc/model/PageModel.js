module.exports = function(Build) {
	/**
	 * @class build.mvc.model.PageModel
	 * @extends build.mvc.model.MongooseModel
	 */
	Build('build.mvc.model.PageModel', [ 'buildnode::build.mvc.model.MongooseModel' ], function($define, $super) {
		$define({
			$extends : 'build.mvc.model.MongooseModel',
			/**
			 * @constructor
			 */
			$constructor : function PageModel(mongoose) {
				$super(this)(mongoose);
				var ObjectId = mongoose.Schema.Types.ObjectId;
				this.schema = new mongoose.Schema({
					route : {
						type : String,
						lowercase : true,
						trim : true,
						required : true,
						unique : true
					//validate : [ validators.notEmpty, 'Username is empty' ]
					},
					title : String,
					body : String,
					createdId : ObjectId,
					updatedId : ObjectId,
					createdDate : Date,
					updatedDate : Date
				});
				this.schema.index({
					route : 1
				});
				this.schema.set('autoIndex', false);
				this.model = mongoose.model('Page', this.schema);
			},
			$singleton : true
		});
	});
};