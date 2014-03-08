Build('build.ui.form.Password', [ 'build::build.ui.form.Text' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Text',
		$constructor : function(text) {
			$super(this)(text);
			this.type = 'input';
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				this.element.type = 'password';
			}
		}
	});
});