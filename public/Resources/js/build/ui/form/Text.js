Build('build.ui.form.Text', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function(text) {
			$super(this)(text);
			this.type = 'input';
			this.watchProperty('text', 'value');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				this.element.type = 'text';
			}
		}
	});
});