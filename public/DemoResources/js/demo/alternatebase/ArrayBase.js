Build('demo.alternatebase.ArrayBase', [ 'build::build.ui.Widget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {

		},
		$base : function(x, y, z) {
			return new Array(x, y, z);
		}
	});
});