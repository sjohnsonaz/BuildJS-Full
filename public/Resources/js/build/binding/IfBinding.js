/**
 * @class build.binding.IfBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.IfBinding', [ 'build::build.binding.OneWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function BindingHandler(destination, definition) {
			$super(this)(destination, definition);
			if (definition) {
				this.format = definition.format || '{0}';
				this.onTrue = definition.onTrue;
				this.onFalse = definition.onFalse;
			}
		},
		$prototype : {
			update : function(subscription, value, reverse) {
				if (this.format) {
					var condition = this.formatString(this.format, this.cache);
					var wrappedCondition = 'if (' + condition + ') {this.evaluate(true);} else {this.evaluate(false);}';
					eval(wrappedCondition);
				}
			},
			evaluate : function(value) {
				if (value) {
					// Clear false value
					if (typeof this.onFalse !== 'function' && this.onFalse instanceof build.Module) {
						this.destination.removeChild(this.onFalse);
					}

					// Add true value
					if (typeof this.onTrue === 'function') {
						this.onTrue();
					} else {
						this.destination.addChild(this.onTrue);
					}
				} else {
					// Clear true value
					if (typeof this.onTrue !== 'function' && this.onTrue instanceof build.Module) {
						this.destination.removeChild(this.onTrue);
					}

					// Add false value
					if (typeof this.onFalse === 'function') {
						this.onFalse();
					} else {
						this.destination.addChild(this.onFalse);
					}
				}
			}
		}
	});
});