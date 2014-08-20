/**
 * @class build.viewmodel.OneWayBinding
 * @extends build.viewmodel.BindingHandler
 */
Build('build.viewmodel.OneWayBinding', [ 'build::build.viewmodel.BindingHandler' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.BindingHandler',
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