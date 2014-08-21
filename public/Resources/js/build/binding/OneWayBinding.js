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
		$constructor : function OneWayBinding(destination, source, property) {
			$super(this)(destination);
			this.source = source;
		},
		$prototype : {
			link : function(destination, source, property) {
				source.subscribe(property, this);
			},
			notify : function(source, property, value) {
				this.update(this.destination, this.source, value, false);
			}
		}
	});
});