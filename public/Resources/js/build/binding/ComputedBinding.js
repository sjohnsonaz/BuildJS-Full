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
		$constructor : function ComputedBinding(definition) {
			$super(this)(definition);
		}
	});
});