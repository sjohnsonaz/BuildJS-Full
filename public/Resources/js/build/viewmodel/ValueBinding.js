/**
 * @class build.viewmodel.ValueBinding
 * @extends build.viewmodel.TwoWayBinding
 */
Build('build.viewmodel.ValueBinding', [ 'build::build.viewmodel.TwoWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.TwoWayBinding',
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