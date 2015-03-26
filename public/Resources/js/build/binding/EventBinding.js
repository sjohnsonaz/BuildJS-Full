/**
 * @class build.binding.EventBinding
 * @extends build.binding.BindingHandler
 */
Build('build.binding.EventBinding', [ 'build::build.binding.BindingHandler' ], function($define, $super) {
	$define({
		$extends : 'build.binding.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function EventBinding(definition) {
			$super(this)(definition);
			if (definition) {
				this.source = definition.source;
				this.sourceProperty = definition.sourceProperty;
				this.type = definition.type;
			}
		},
		$prototype : {
			link : function(definition) {
				this.destination.addEventListener(this.type, this.source[this.sourceProperty], undefined, this.source);
			}
		},
		$post : function() {
			build.Module.handlers['event'] = this;
		}
	});
});