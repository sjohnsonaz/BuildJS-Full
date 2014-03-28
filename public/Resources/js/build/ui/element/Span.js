Build('build.ui.form.Span', [ 'build::build.ui.element.Element' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function Span(text) {
			$super(this)(text);
			this.type = 'span';
		}
	});
});