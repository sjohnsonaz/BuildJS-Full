Build('build.ui.element.LineBreak', [ 'build::build.ui.element.Element' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function LineBreak(text) {
			$super(this)(text);
			this.type = 'br';
		}
	});
});