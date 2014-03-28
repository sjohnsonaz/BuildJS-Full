Build('build.ui.element.Link', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function Link(text) {
			$super(this)(text);
			this.type = 'a';
		}
	});
});