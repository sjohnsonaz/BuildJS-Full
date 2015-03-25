/**
 * @class build.binding.ForEachBinding
 * @extends build.binding.BindingHandler
 */
Build('build.binding.ForEachBinding', [ 'build::build.binding.BindingHandler' ], function($define, $super) {
	$define({
		$extends : 'build.binding.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function ForEachBinding(definition) {
			$super(this)(definition);
			if (definition) {
				if (definition.template) {
					this.destination.template = definition.template;
				}
				this.source = definition.source;
				this.property = definition.property || 'children';
			}
		},
		$prototype : {
			link : function(definition) {
				this.destination.children = this.source[this.property];
			}
		}
	});
});