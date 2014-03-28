Build('build.ui.element.Div', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function Div(text) {
			$super(this)(text);
			this.type = 'div';
		}
	});
});