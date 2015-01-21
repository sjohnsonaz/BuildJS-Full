/**
 * @class demo.example.viewmodel.FormModel
 * @extends build.viewmodel.ViewModel
 */
Build('demo.example.viewmodel.FormModel', [ 'build::build.viewmodel.ViewModel', 'build::build.utility.ObservableArray' ], function(define, $super) {
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
			this.testArray = build.utility.ObservableArray([ 1, 2, 3 ]);
			this.testValue = 'Test Value';
			this.testTrue = true;
			this.testFalse = false;
		}
	});
});