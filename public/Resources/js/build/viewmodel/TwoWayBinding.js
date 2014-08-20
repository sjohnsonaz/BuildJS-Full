/**
 * @class build.viewmodel.TwoWayBinding
 * @extends build.viewmodel.BindingHandler
 */
Build('build.viewmodel.TwoWayBinding', [ 'build::build.viewmodel.BindingHandler' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function TwoWayBinding(destination, source, sourceProperty, destinationProperty) {
			$super(this)(destination);
			this.source = source;
			this.sourceProperty = sourceProperty;
			this.destinationProperty = destinationProperty;
		},
		$prototype : {
			link : function(destination, source, sourceProperty, destinationProperty) {
				source.subscribe(sourceProperty, this);
				destination.subscribe(destinationProperty, this);
			},
			notify : function(source, property, value) {
				if (source == this.source) {
					this.update(this.destination, this.source, value, false);
				} else if (source == this.destination) {
					this.update(this.destination, this.source, value, true);
				}
			},
			update : function(destination, source, value, reverse) {
				if (!reverse) {
					destination[this.destinationProperty] = value;
				} else {
					source[this.sourceProperty] = value;
				}
			}
		}
	});
});