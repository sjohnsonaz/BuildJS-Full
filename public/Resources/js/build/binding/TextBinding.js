/**
 * @class build.binding.TextBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.TextBinding', [ 'build::build.binding.OneWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function TextBinding(destination, definition) {
			$super(this)(destination, definition);
			if (definition) {
				this.format = definition.format;
			}
		},
		$prototype : {
			update : function(subscription, value, reverse) {
				if (this.format) {
					switch (typeof this.format) {
					case 'function':
						this.destination.rawText = this.format.apply(this, this.cache) || '';
						break;
					case 'string':
						this.destination.rawText = this.formatString(this.format, this.cache);
						break;
					}
				} else {
					this.destination.text = value;
				}
			}
		}
	});
});