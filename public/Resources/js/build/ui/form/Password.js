Build('build.ui.form.Password', [ 'build::build.ui.form.Text' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Text',
		$constructor : function Password(text, value) {
			$super(this)(text, value);
			this.type = 'input';
		},
		$prototype : {
			init : function(text, value) {
				$super().init(this)(text);
				this.element.type = 'password';
			}
		}
	});
});