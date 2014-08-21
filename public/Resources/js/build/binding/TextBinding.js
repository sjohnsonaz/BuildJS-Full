/**
 * @class build.binding.TextBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.TextBinding', [ 'build::build.binding.OneWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function TextBinding(destination, source, property) {
			$super(this)(destination, source, property);
		},
		$prototype : {
			init : function(destination, source) {
			},
			update : function(destination, source, value, reverse) {
				destination.text = value;
			}
		}
	});
});