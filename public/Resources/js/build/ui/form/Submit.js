Build('build.ui.form.Submit', [ 'build::build.ui.form.Button' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Button',
		$constructor : function Submit(text, value) {
			$super(this)(text, value);
			this.type = 'button';
		},
		$prototype : {
			init : function(text, value) {
				$super().init(this)(text, value);
				this.element.type = 'submit';
			}
		}
	});
});