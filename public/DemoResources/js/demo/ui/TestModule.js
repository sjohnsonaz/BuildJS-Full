Build('demo.ui.TestModule', [], function(define, $super) {
	define({
		$extends : 'build.Module',
		$constructor : function TestModule() {
			$super(this)();
			console.log('demo.ui.TestModule');
		}
	});
});