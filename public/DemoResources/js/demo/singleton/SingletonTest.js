/**
 * @class demo.singleton.SingletonTest
 */
Build('demo.singleton.SingletonTest', [], function($define, $super) {
	$define({
		/**
		 * @constructor
		 */
		$constructor : function SingletonTest() {
			this.data = Math.random();
		},
		$singleton : true
	});
});