/**
 * @class build.binding.ForEachBinding
 * @extends build.binding.BindingHandler
 */
Build('build.binding.ForEachBinding', [ 'build::build.binding.BindingHandler' ], function(define, $super) {
	define({
		$extends : 'build.binding.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function ForEachBinding(destination, source, property) {
			$super(this)();
			this.source = source;
		},
		$prototype : {
			link : function(destination, source, property) {
				source.subscribe(property, this);
			}
		}
	});
});