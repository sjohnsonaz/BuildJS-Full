/**
 * @class build.binding.PropertyBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.PropertyBinding', [ 'build::build.binding.OneWayBinding' ], function($define, $super) {
	$define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function PropertyBinding(definition) {
			$super(this)(definition);
		}
	});
});