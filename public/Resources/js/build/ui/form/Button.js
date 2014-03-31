Build('build.ui.form.Button', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function Button(text, value) {
			$super(this)(text, value);
			this.type = 'button';
		},
		$prototype : {
			init : function(text, value) {
				$super().init(this)(text, value);
				this.element.type = 'button';
			}
		}
	});
});