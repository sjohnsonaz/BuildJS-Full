Build('demo.singleton.SingletonTest', [], function(define, $super, merge) {
	define({
		$constructor : function() {
			this.data = Math.random();
		},
		$singleton : true
	});
});