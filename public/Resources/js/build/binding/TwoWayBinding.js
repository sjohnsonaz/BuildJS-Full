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
		$constructor : function TwoWayBinding(definition) {
			$super(this)(definition);
			if (definition) {
				// TODO: Should we store this?
				this.source = definition.source;
				if (this.source && (this.source instanceof build.Module)) {
					this.source.addHandler(this);
				}
				this.sourceProperty = definition.sourceProperty;
				this.destinationProperty = definition.destinationProperty;
				this.outputToSource = definition.outputToSource;
				this.outputToDestination = definition.outputToDestination;
			}
			this.watchValue('locked', false);
		},
		$prototype : {
			link : function(definition) {
				this.source.subscribe(this.sourceProperty, this);
				this.destination.subscribe(this.destinationProperty, this);
			},
			notify : function(subscription, value) {
				if (!this.locked) {
					if (subscription.publisher == this.source && subscription.property == this.sourceProperty) {
						this.update(subscription, value, false);
					} else if (subscription.publisher == this.destination && subscription.property == this.destinationProperty) {
						this.update(subscription, value, true);
					}
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
		},
		$post : function() {
			build.Module.handlers.twoWay = this;
		}
	});
});