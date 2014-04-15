/**
 * @class build.widget.menu.MenuText
 * @extends build.ui.element.Div
 */
Build('build.widget.menu.MenuText', [ 'build::build.ui.element.Div' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Div',
		$constructor : function MenuText(text) {
			$super(this)(text);
		}
	});
});