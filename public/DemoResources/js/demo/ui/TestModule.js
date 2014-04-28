Build('demo.ui.TestModule', [], function(define, $super) {
	define({
		$extends : 'build.ui.Module',
		$constructor : function TestModule() {
			$super(this)();
			console.log('demo.ui.TestModule');
		}
	});
});