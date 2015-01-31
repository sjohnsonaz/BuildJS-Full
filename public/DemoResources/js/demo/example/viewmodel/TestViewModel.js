/**
 * @class demo.example.viewmodel.TestViewModel
 * @extends build.viewmodel.ViewModel
 */
Build('demo.example.viewmodel.TestViewModel', [ 'build::build.viewmodel.ViewModel' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.ViewModel',
		/**
		 * @constructor
		 */
		$constructor : function TestViewModel(data) {
			$super(this)({
				testValue : {},
				testTrue : {},
				testFalse : {},
				testArray : {
					type : 'array'
				}
			}, data);
		}
	});
});