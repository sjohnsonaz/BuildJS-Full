Build('build.ui.form.Button', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function(parameters) {
			parameters = parameters || {};
			parameters.type = parameters.type || 'button';
			$super(this)(parameters);
		},
		$prototype : {
			build : function() {
				this.element.innerHTML = 'Button';
			}
		}
	});
});