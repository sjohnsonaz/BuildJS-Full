/**
 * @class build.viewmodel.TextBinding
 * @extends build.viewmodel.BindingHandler
 */
Build('build.viewmodel.TextBinding', [ 'build::build.viewmodel.BindingHandler' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function TextBinding() {
			$super(this)();
		},
		$prototype : {
			init : function(source, destination) {
			},
			update : function(source, destination, value, reverse) {
				destination.text = source[sourceProperty];
			}
		}
	});
});