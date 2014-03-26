Build('build.ui.element.Div', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function(text) {
			$super(this)();
			this.type = 'div';
		}
	});
});