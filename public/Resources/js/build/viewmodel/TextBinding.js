/**
 * @class build.viewmodel.TextBinding
 * @extends build.viewmodel.OneWayBinding
 */
Build('build.viewmodel.TextBinding', [ 'build::build.viewmodel.OneWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.OneWayBinding',
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