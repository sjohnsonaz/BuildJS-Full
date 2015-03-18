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
		$constructor : function EventBinding(destination, source, sourceProperty, destinationProperty) {
			$super(this)(destination);
			this.source = source;
			this.sourceProperty = sourceProperty;
			this.destinationProperty = destinationProperty;
		},
		$prototype : {
			link : function(destination, source, sourceProperty, destinationProperty) {
				destination.addEventListener(destinationProperty, source[sourceProperty], undefined, source);
			}
		}
	});
});