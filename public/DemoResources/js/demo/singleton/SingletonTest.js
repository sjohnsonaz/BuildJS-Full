Build('demo.singleton.SingletonTest', [], function(define, $super, merge) {
	define({
		$constructor : function SingletonTest() {
			this.data = Math.random();
		},
		$singleton : true
	});
});