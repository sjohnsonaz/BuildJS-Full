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
			this.childTrue = null;
			this.childFalse = null;
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
					if (this.childFalse) {
						this.destination.removeChild(this.childFalse);
						if (typeof this.onFalse === 'function') {
							this.childFalse.destroy();
							delete this.childFalse;
						}
						this.childFalse = null;
					}

					// Add true value
					if (typeof this.onTrue === 'function') {
						this.childTrue = this.onTrue();
					} else {
						this.childTrue = this.onTrue;
					}
					if (this.childTrue) {
						this.destination.addChild(this.childTrue);
					}
				} else {
					// Clear true value
					if (this.childTrue) {
						this.destination.removeChild(this.childTrue);
						if (typeof this.onTrue === 'function') {
							this.childTrue.destroy();
							delete this.childTrue;
						}
						this.childTrue = null;
					}

					// Add false value
					if (typeof this.onFalse === 'function') {
						this.childFalse = this.onFalse();
					} else {
						this.childFalse = this.onFalse;
					}
					if (this.childFalse) {
						this.destination.addChild(this.childFalse);
					}
				}
			}
		}
	});
});