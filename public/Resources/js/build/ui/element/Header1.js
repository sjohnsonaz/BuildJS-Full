Build('build.ui.element.Header1', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function Header1(text) {
			$super(this)(text);
			this.type = 'h1';
		}
	});
});