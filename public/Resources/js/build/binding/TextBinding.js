/**
 * @class build.binding.TextBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.TextBinding', [ 'build::build.binding.OneWayBinding' ], function($define, $super) {
	$define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function TextBinding(definition) {
			definition = definition || {};
			definition.property = definition.property || 'rawText';
			$super(this)(definition);
		}
	});
});