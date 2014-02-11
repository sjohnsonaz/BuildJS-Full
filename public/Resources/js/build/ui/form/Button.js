Build('build.ui.form.Button', [ 'build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function(type) {
			$super(this)(type || 'button');
		},
		$prototype : {
			build : function() {
				this.element.innerHTML = 'Button';
			}
		}
	});
});