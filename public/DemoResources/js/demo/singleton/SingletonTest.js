Build('demo.singleton.SingletonTest', [], function(define, $super, helper) {
	define({
		$constructor : function SingletonTest() {
			this.data = Math.random();
		},
		$singleton : true
	});
});