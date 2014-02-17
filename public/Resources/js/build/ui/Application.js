Build('build.ui.Application', [ 'build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(parameters) {
			$super(this)(parameters);
		}
	});
});