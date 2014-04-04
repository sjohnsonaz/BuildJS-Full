Build('build.widget.menu.MenuTitle', [ 'build::build.widget.menu.MenuText' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.widget.menu.MenuText',
		$constructor : function(text) {
			$super(this)(text);
		}
	});
});