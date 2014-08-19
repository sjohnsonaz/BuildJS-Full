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
			bind : function(source, destination) {
				//this.link(source, destination);
				this.init(source, destination);
				//this.update(source, destination);
			},
			link : function(source, destination, sourceProperty, destinationProperty, bidirectional) {
				source.subscribe(destination, sourceProperty, true);
				if (bidirectional) {
					// This will cause an infinite loop unless we prevent the second publish.
					destination.subscribe(source, destinationProperty, true);
				}
				source.publish(sourceProperty, destination);
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