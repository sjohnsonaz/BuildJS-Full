Build('build.ui.element.Element', [ 'build::build.ui.Widget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function Element(text) {
			$super(this)(text);
			this.watchProperty('text', 'innerHTML');
		},
		$prototype : {
			init : function(text) {
				$super().init(this)(text);
				this.text = text;
			}
		}
	});
});