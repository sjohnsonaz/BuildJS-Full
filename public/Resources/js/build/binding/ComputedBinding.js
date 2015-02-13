/**
 * @class build.binding.ComputedBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.ComputedBinding', [ 'build::build.binding.OneWayBinding' ], function($define, $super) {
	$define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function ComputedBinding(destination, definition) {
			// TODO: Should we remove the 'string' support, or merge this with TextBinding?
			// We could also simplify and remove the destination argument.
			// Or we could change the destination argument to a function.
			$super(this)(destination, definition);
			if (definition) {
				this.output = definition.output;
				this.destinationProperty = definition.destination;
			}
		},
		$prototype : {
			update : function(subscription, value, reverse) {
				var result;
				if (this.output) {
					switch (typeof this.output) {
					case 'function':
						result = this.output.apply(this, this.cache);
						break;
					case 'string':
						result = this.formatString(this.output, this.cache);
						break;
					}
				} else {
					result = this.cache[0];
				}
				if (this.destinationProperty) {
					this.destination[this.destinationProperty] = result || '';
				}
			}
		}
	});
});