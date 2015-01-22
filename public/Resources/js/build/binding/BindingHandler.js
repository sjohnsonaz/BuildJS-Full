/**
 * @class build.binding.BindingHandler
 * @extends build.Module
 */
Build('build.binding.BindingHandler', [ 'build::build.Module' ], function(define, $super) {
	define({
		$extends : 'build.Module',
		/**
		 * @constructor
		 */
		$constructor : function BindingHandler(destination) {
			$super(this)();
			this.destination = destination;
			destination.addHandler(this);
		},
		$prototype : {
			link : function() {
			},
			notify : function(subscription, value) {
			},
			init : function() {
			},
			update : function(subscription, value, reverse) {
			}
		},
		$static : {
			create : function(destination, source) {
				var result;
				if (Build.debug) {
					result = Object.create(this.prototype, {
						constructor : {
							value : this
						}
					});
				} else {
					result = Object.create(this.prototype);
				}
				result = this.apply(result, arguments) || result;
				result.link.apply(result, arguments);
				result.init.apply(result, arguments);
				return result;
			}
		}
	});
});