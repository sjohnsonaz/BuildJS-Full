/**
 * @class build.binding.TwoWayBinding
 * @extends build.binding.BindingHandler
 */
Build('build.binding.TwoWayBinding', [ 'build::build.binding.BindingHandler' ], function($define, $super) {
	$define({
		$extends : 'build.binding.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function TwoWayBinding(destination, source, sourceProperty, destinationProperty, outputToSource, outputToDestination) {
			$super(this)(destination);
			this.source = source;
			this.sourceProperty = sourceProperty;
			this.destinationProperty = destinationProperty;
			this.outputToSource = outputToSource;
			this.outputToDestination = outputToDestination;
		},
		$prototype : {
			link : function(destination, source, sourceProperty, destinationProperty) {
				source.subscribe(sourceProperty, this);
				destination.subscribe(destinationProperty, this);
			},
			notify : function(subscription, value) {
				if (subscription.publisher == this.source && subscription.property == this.sourceProperty) {
					this.update(subscription, value, false);
				} else if (subscription.publisher == this.destination && subscription.property == this.destinationProperty) {
					this.update(subscription, value, true);
				}
			},
			update : function(subscription, value, reverse) {
				// Updates must only happen on new values.  Otherwise it becomes a loop.
				if (!reverse) {
					this.destination.preventNotifications(this.destinationProperty, true, this);
					this.destination[this.destinationProperty] = typeof this.outputToDestination === 'function' ? this.outputToDestination(value) : value;
					this.destination.preventNotifications(this.destinationProperty, false, this);
				} else {
					this.source.preventNotifications(this.sourceProperty, true, this);
					this.source[this.sourceProperty] = typeof this.outputToSource === 'function' ? this.outputToSource(value) : value;
					this.source.preventNotifications(this.sourceProperty, false, this);
				}
			}
		}
	});
});