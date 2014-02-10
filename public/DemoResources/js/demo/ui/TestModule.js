Build('demo.ui.TestModule', [], function(define) {
	define({
		$extends: 'build.ui.Module',
		$constructor : function() {
			this.$super();
			console.log('demo.ui.TestModule');
		}
	});
});