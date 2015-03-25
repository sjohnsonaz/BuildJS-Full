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
		$constructor : function FunctionBinding(definition) {
			$super(this)(definition);
		}
	});
});