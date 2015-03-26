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
		$constructor : function OneWayBinding(definition) {
			$super(this)(definition);
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
				this.output = definition.output;
				this.property = definition.property;
			}
		},
		$prototype : {
			link : function(definition) {
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
			},
			update : function(subscription, value, reverse) {
				var result;
				if (this.output) {
					switch (typeof this.output) {
					case 'function':
						result = this.output.apply(this, this.cache);
						break;
					case 'string':
						result = this.formatString(this.output, this.cache);
						break;
					}
				} else {
					result = this.cache[0];
				}
				if (this.destination && this.property) {
					this.destination[this.property] = result;
				}
			}
		},
		$post : function() {
			build.Module.handlers.oneWay = this;
		}
	});
});