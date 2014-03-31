Build('build.ui.form.Text', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function Text(text, value) {
			$super(this)(text, value);
			this.type = 'input';
			this.watchProperty('value');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
		},
		$prototype : {
			init : function(text, value) {
				$super().init(this)(text, value);
				this.element.type = 'text';
			}
		}
	});
});