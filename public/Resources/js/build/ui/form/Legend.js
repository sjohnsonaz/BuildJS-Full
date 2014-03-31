Build('build.ui.form.Legend', [ 'build::build.ui.element.Element' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function Legend(text) {
			$super(this)(text);
			this.type = 'legend';
		}
	});
});