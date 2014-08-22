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
			notify : function(source, property, value) {
			},
			init : function() {
			},
			update : function(source, destination, value, reverse) {
			},
			formatString : function(pattern) {
				var args = arguments.splice(1, 1);
				return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function(m, n) {
					if (m == "{{") {
						return "{";
					}
					if (m == "}}") {
						return "}";
					}
					return args[n];
				});
			}
		},
		$static : {
			create : function(destination, source) {
				var result = Object.create(this.prototype);
				result = this.apply(result, arguments) || result;
				result.link.apply(result, arguments);
				result.init.apply(result, arguments);
				return result;
			},
		}
	});
});