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
				// TODO: Pre-cache or hold to false until all updates are complete.
				var index = this.subscriptions.indexOf(subscription);
				this.cache[index] = value;
				if (this.format) {
					var condition = this.formatString(this.format, this.cache);
					var wrappedCondition = 'if (' + condition + ') {this.evaluate(true);} else {this.evaluate(false);}';
					eval(wrappedCondition);
				}
			},
			evaluate : function(value) {
				if (value) {
					if (typeof this.onTrue === 'function') {
						this.onTrue();
					}
				} else {
					if (typeof this.onFalse === 'function') {
						this.onFalse();
					}
				}
				console.log('Condition: ' + value);
			}
		}
	});
});