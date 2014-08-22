/**
 * @class demo.viewmodel.FormModel
 * @extends build.viewmodel.ViewModel
 */
Build('demo.viewmodel.FormModel', [ 'build::build.viewmodel.ViewModel' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.ViewModel',
		/**
		 * @constructor
		 */
		$constructor : function FormModel() {
			$super(this)();
			this.watchValue('testValue');
			this.watchValue('testTrue');
			this.watchValue('testFalse');
			this.testValue = 'Test Value';
			this.testTrue = true;
			this.testFalse = false;
		}
	});
});