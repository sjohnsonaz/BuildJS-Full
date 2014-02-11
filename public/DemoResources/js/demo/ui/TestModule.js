Build('demo.ui.TestModule', [], function(define, $super) {
	define({
		$extends: 'build.ui.Module',
		$constructor : function() {
			$super(this)();
			console.log('demo.ui.TestModule');
		}
	});
});