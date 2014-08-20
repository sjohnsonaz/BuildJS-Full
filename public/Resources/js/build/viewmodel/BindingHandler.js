/**
 * @class build.viewmodel.BindingHandler
 * @extends build.Module
 */
Build('build.viewmodel.BindingHandler', [ 'build::build.Module' ], function(define, $super) {
	define({
		$extends : 'build.Module',
		/**
		 * @constructor
		 */
		$constructor : function BindingHandler(destination) {
			$super(this)();
			this.destination = destination;
			this.destination.handlers.push(this);
		},
		$prototype : {
			link : function() {
			},
			notify : function(source, property, value) {
			},
			init : function() {
			},
			update : function(source, destination, value, reverse) {
			}
		},
		$static : {
			create : function(destination, source) {
				var result = Object.create(this.prototype);
				result = this.apply(result, arguments) || result;
				result.link.apply(result, arguments);
				result.init.apply(result, arguments);
				//this.update.apply(result, arguments);
				return result;
			},
		}
	});
});