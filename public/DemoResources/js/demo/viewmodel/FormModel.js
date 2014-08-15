Build('demo.viewmodel.FormModel', [ 'build.viewmodel.ViewModel' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.ViewModel',
		$constructor : function() {
			$super(this)();
			this.watchValue('testValue');
			//this.testValue = 'Test Value';
		}
	});
});