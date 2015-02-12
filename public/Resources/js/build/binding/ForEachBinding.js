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
		$constructor : function ForEachBinding(destination, source, property, template) {
			$super(this)(destination);
			if (template) {
				destination.template = template;
			}
			this.source = source;
			this.property = property;
		},
		$prototype : {
			link : function(destination, source, property) {
				destination.children = source[property];
			}
		}
	});
});