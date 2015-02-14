/**
 * @class build.binding.ValueBinding
 * @extends build.binding.TwoWayBinding
 */
Build('build.binding.ValueBinding', [ 'build::build.binding.TwoWayBinding' ], function($define, $super) {
	$define({
		$extends : 'build.binding.TwoWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function ValueBinding(destination, source, sourceProperty, destinationProperty, outputToSource, outputToDestination) {
			$super(this)(destination, source, sourceProperty, destinationProperty || 'value', outputToSource, outputToDestination);
		},
		$prototype : {
			link : function(destination, source, sourceProperty, destinationProperty) {
				$super().link(this)(destination, source, sourceProperty, destinationProperty || 'value');
			},
			update : function(subscription, value, reverse) {
				if (reverse && this.destination.maskValidRequired) {
					if (this.destination.element.validity.valid) {
						$super().update(this)(subscription, value, reverse);
					}
				} else {
					$super().update(this)(subscription, value, reverse);
				}
			}
		}
	});
});