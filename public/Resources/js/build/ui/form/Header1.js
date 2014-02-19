Build('build.ui.form.Header1', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function(parameters) {
			parameters = parameters || {};
			parameters.type = parameters.type = 'h1';
			$super(this)(parameters);
			this.title = '';
		},
		$prototype : {
			setTitle : function(title) {
				this.title = title;
				this.element.innerHTML = title;
			}
		}
	});
});