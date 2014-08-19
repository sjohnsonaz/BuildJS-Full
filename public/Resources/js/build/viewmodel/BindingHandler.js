/**
 * @class build.viewmodel.BindingHandler
 */
Build('build.viewmodel.BindingHandler', [], function(define, $super) {
	define({
		/**
		 * @constructor
		 */
		$constructor : function BindingHandler() {

		},
		$prototype : {
			bind : function(source, destination, sourceProperty, destinationProperty, bidirectional) {
				this.link(source, destination, sourceProperty, destinationProperty, bidirectional);
				this.init(source, destination);
				//this.update(source, destination);
			},
			link : function(source, destination, sourceProperty, destinationProperty, bidirectional) {
				source.subscribe(sourceProperty, destination);
				if (bidirectional) {
					// TODO: This will cause an infinite loop unless we prevent the second publish.
					destination.subscribe(destinationProperty, source);
				}
				//source.publish(sourceProperty, destination);
			},
			notify : function(source, value) {
				if (this.source == source) {
					this.update(this.source, this.destination, value, false);
				} else if (this.destination = source) {
					this.update(this.source, this.destination, value, true);
				}
			},
			init : function(source, destination) {
			},
			update : function(source, destination, value, reverse) {
			}
		}
	});
});