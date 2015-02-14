/**
 * @class build.binding.OneWayBinding
 * @extends build.binding.BindingHandler
 */
Build('build.binding.OneWayBinding', [ 'build::build.binding.BindingHandler' ], function($define, $super) {
	$define({
		$extends : 'build.binding.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function OneWayBinding(destination, definition) {
			$super(this)(destination);
			this.cache = [];
			this.sources = [];
			this.properties = [];
			this.subscribeComplete = false;
			if (definition) {
				var sourceDefinitions = definition.sources || [];
				for (var index = 0, length = sourceDefinitions.length; index < length; index++) {
					var sourceDefinition = sourceDefinitions[index];
					if (sourceDefinition.source && sourceDefinition.property) {
						this.sources.push(sourceDefinition.source);
						this.properties.push(sourceDefinition.property);
					}
				}
			}
		},
		$prototype : {
			link : function(destination, definition) {
				for (var index = 0, length = this.sources.length; index < length; index++) {
					this.sources[index].subscribe(this.properties[index], this);
				}
				this.subscribeComplete = true;
				// Post last subscription
				if (this.subscriptions) {
					var subscription = this.subscriptions[this.subscriptions.length - 1];
					if (!this.locked) {
						this.update(subscription, subscription.value, false);
					}
				}
			},
			notify : function(subscription, value) {
				var index = this.subscriptions.indexOf(subscription);
				this.cache[index] = value;
				if (this.subscribeComplete) {
					if (!this.locked) {
						this.update(subscription, value, false);
					}
				}
			}
		}
	});
});