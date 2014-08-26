/**
 * @class build.binding.PropertyBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.PropertyBinding', [ 'build::build.binding.OneWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function PropertyBinding(destination, definition) {
			$super(this)(destination, definition);
			if (definition) {
				this.format = definition.format;
				this.property = definition.property || 'text';
			}
		},
		$prototype : {
			update : function(subscription, value, reverse) {
				if (this.format) {
					this.destination[this.property] = this.formatString(this.format, this.cache);
				} else {
					this.destination[this.property] = value;
				}
			}
		}
	});
});