/**
 * @class build.binding.ValueBinding
 * @extends build.binding.TwoWayBinding
 */
Build('build.binding.ValueBinding', [ 'build::build.binding.TwoWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.binding.TwoWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function ValueBinding(destination, source, sourceProperty, destinationProperty) {
			$super(this)(destination, source, sourceProperty, destinationProperty || 'value');
		},
		$prototype : {
			link : function(destination, source, sourceProperty, destinationProperty) {
				$super().link(this)(destination, source, sourceProperty, destinationProperty || 'value');
			}
		}
	});
});