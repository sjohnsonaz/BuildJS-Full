/**
 * @class build.binding.IfBinding
 * @extends build.binding.BindingHandler
 */
Build('build.binding.IfBinding', [ 'build::build.binding.BindingHandler' ], function(define, $super) {
	define({
		$extends : 'build.binding.BindingHandler',
		/**
		 * @constructor
		 */
		$constructor : function BindingHandler(destination, source) {
			$super(this)(destination);
		}
	});
});