/**
 * @class build.binding.OneWayBinding
 * @extends build.binding.BindingHandler
 */
Build('build.binding.OneWayBinding', [ 'build::build.binding.BindingHandler' ], function(define, $super) {
	define({
		$extends : 'build.binding.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function OneWayBinding(destination, definition) {
			$super(this)(destination);
			this.cache = [];
			this.sources = [];
			this.properties = [];
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
			},
			notify : function(source, property, value) {
				this.update(this.destination, source, value, false);
			}
		}
	});
});