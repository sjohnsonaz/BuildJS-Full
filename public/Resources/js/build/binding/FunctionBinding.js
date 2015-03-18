/**
 * @class build.binding.FunctionBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.FunctionBinding', [ 'build::build.binding.OneWayBinding' ], function($define, $super) {
	$define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function FunctionBinding(destination, definition) {
			$super(this)(destination, definition);
			if (definition) {
				this.output = definition.output;
			}
		},
		$prototype : {
			update : function(subscription, value, reverse) {
				result = this.output.apply(this, this.cache);
			}
		}
	});
});