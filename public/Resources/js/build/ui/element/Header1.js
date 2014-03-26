Build('build.ui.element.Header1', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function(title) {
			$super(this)();
			this.type = 'h1';
		}
	});
});