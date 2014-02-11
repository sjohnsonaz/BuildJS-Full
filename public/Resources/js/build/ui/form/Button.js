Build('build.ui.form.Button', [ 'build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function() {
			$super(this)();
			this.type = 'button';
		},
		$prototype : {
			build : function() {
				this.element.innerHtml = 'Button';
			}
		}
	});
});