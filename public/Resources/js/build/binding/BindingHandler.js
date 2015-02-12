/**
 * @class build.binding.BindingHandler
 * @extends build.Module
 */
Build('build.binding.BindingHandler', [ 'build::build.Module' ], function($define, $super) {
	$define({
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
				var result = Object.create(this.prototype, Build.debug ? {
					constructor : {
						value : this
					}
				} : undefined);
				result = this.apply(result, arguments) || result;
				result.link.apply(result, arguments);
				result.init.apply(result, arguments);
				return result;
			}
		}
	});
});