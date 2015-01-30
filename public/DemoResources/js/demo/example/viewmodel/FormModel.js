/**
 * @class demo.example.viewmodel.FormModel
 * @extends build.viewmodel.ViewModel
 */
Build('demo.example.viewmodel.FormModel', [ 'build::build.viewmodel.ViewModel' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.ViewModel',
		/**
		 * @constructor
		 */
		$constructor : function FormModel(data) {
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