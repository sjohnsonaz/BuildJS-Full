Build('build.ui.form.TextArea', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function(text, value) {
			$super(this)(text, value);
			this.type = 'textarea';
			this.watchProperty('innerHTML', 'value');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
		}
	});
});