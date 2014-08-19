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
				this.link(source, destination);
				this.init(source, destination);
				this.update(source, destination);
			},
			link : function(source, destination) {
				source.subscribe(destination);
			},
			init : function(source, destination, sourceProperty, destinationProperty, computed, value, reverse) {
			},
			update : function(source, destination, sourceProperty, destinationProperty, computed, value, reverse) {
			}
		}
	});
});