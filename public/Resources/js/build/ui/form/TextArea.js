Build('build.ui.form.TextArea', [ 'build::build.ui.form.Text' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Text',
		$constructor : function(text) {
			$super(this)(text);
			this.type = 'textarea';
		},
		$prototype : {
			build : function() {
				$super().build(this)();
			}
		}
	});
});