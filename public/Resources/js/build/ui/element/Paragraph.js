Build('build.ui.form.Paragraph', [ 'build::build.ui.element.Element' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function Paragraph(text) {
			$super(this)(text);
			this.type = 'p';
		}
	});
});