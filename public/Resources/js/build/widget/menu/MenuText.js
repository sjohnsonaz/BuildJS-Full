Build('build.widget.menu.MenuText', [ 'build::build.ui.element.Div' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Div',
		$constructor : function(text) {
			$super(this)(text);
		}
	});
});