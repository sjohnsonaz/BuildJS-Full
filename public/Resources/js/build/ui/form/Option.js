Build('build.ui.form.Option', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function Option() {
			$super(this)();
			this.type = 'option';
			this.watchProperty('value');
			this.watchProperty('selected');
		}
	});
});