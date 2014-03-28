Build('build.ui.element.HorizontalRule', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function HorizontalRule(text) {
			$super(this)(text);
			this.type = 'hr';
		}
	});
});