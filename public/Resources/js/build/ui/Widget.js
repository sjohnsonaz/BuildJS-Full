Build('build.ui.Widget', [ 'build.ui.Module' ], function(define) {
	define({
		$extends : 'build.ui.Module',
		$constructor : function() {
			this.$super();
			console.log('build.ui.Widget');
		}
	});
});