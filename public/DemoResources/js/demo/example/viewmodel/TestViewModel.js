/**
 * @class demo.example.viewmodel.TestViewModel
 * @extends build.mvvm.ViewModel
 */
Build('demo.example.viewmodel.TestViewModel', [ 'build::build.mvvm.ViewModel' ], function($define, $super) {
	$define({
		$extends : 'build.mvvm.ViewModel',
		/**
		 * @constructor
		 */
		$constructor : function TestViewModel(data) {
			$super(this)({
				testValue : {},
				testTrue : {
					value : true
				},
				testFalse : {
					value : false
				},
				testArray : {
					type : 'array'
				}
			}, data);
		}
	});
});