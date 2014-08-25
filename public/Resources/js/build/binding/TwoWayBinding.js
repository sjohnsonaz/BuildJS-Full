/**
 * @class build.binding.TwoWayBinding
 * @extends build.binding.BindingHandler
 */
Build('build.binding.TwoWayBinding', [ 'build::build.binding.BindingHandler' ], function(define, $super) {
	define({
		$extends : 'build.binding.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function TwoWayBinding(destination, source, sourceProperty, destinationProperty) {
			$super(this)(destination);
			this.source = source;
			this.sourceProperty = sourceProperty;
			this.destinationProperty = destinationProperty;
		},
		$prototype : {
			link : function(destination, source, sourceProperty, destinationProperty) {
				source.subscribe(sourceProperty, this);
				destination.subscribe(destinationProperty, this);
			},
			notify : function(subscription, value) {
				if (subscription.publisher == this.source) {
					this.update(subscription, value, false);
				} else if (subscription.publisher == this.destination) {
					this.update(subscription, value, true);
				}
			},
			update : function(subscription, value, reverse) {
				if (!reverse) {
					this.destination[this.destinationProperty] = value;
				} else {
					this.source[this.sourceProperty] = value;
				}
			}
		}
	});
});