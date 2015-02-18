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
					// TODO: Not supported in IE9
					var validity = this.destination.element.validity
					if (!(validity)) {
						var pattern = new RegExp(this.destination.element.pattern, 'g');
						if (this.destination.element.value.match(pattern)) {
							$super().update(this)(subscription, value, reverse);
						}
					} else if (validity.valid) {
						$super().update(this)(subscription, value, reverse);
					}
				} else {
					$super().update(this)(subscription, value, reverse);
				}
			}
		}
	});
});