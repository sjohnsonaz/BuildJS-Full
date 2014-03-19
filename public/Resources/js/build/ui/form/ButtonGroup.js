Build('build.ui.form.ButtonGroup', ['build::build.ui.Panel'], function(define, $super, merge) {
	define({
		$extends: 'build.ui.Panel',
		$constructor: function () {
			$super(this)();
			this.directAppend = true;
		}
	});
});