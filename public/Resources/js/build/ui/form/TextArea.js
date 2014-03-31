Build('build.ui.form.TextArea', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function TextArea(text, value) {
			$super(this)(text, value);
			this.type = 'textarea';
			this.watchProperty('value', 'innerHTML');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
		}
	});
});