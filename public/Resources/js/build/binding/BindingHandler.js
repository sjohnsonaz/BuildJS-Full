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
			},
			formatString : function(pattern, values) {
				if (!(values instanceof Array)) {
					values = Array.prototype.slice.call(arguments).splice(1, 1);
				}
				return pattern.replace(/\{\{|\}\}|\{(\d+)\}|\{(\w+:\d+)\}/g, function(escape, index, helper) {
					if (escape == "{{") {
						return "{";
					}
					if (escape == "}}") {
						return "}";
					}
					if (helper) {
						var data = helper.split(/\s*:\s*/);
						if (data.length > 1) {
							var templateHelper = build.binding.BindingHandler.helpers[data[0]];
							if (typeof templateHelper === 'function') {
								var argsIndexes = data[1].split(/\s*,\s*/);
								var args = argsIndexes.map(function(value) {
									return values[value];
								});
								return templateHelper.apply(this, args);
							} else {
								// Helper not found
								return '';
							}
						} else {
							// This should not happen
							return '';
						}
					}
					return values[index];
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
			helpers : {
				'i' : function(value) {
					return '<i class="fa fa-' + value + '"></i>';
				}
			}
		}
	});
});