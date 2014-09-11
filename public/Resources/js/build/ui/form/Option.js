Build('build.ui.form.Option', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function Option(text) {
			$super(this)(text);
			this.watchProperty('value');
			this.watchProperty('selected');
		},
		$prototype : {
			type : 'option'
		}
	});
});