Build('demo.alternatebase.ArrayBase', [], function(define, $super, merge, safe) {
	define({
		$constructor : function ArrayBase() {
			this.test0 = 0;
		},
		$base : function(x, y, z) {
			return new Array(x, y, z);
		},
		$prototype : {
			test1 : 1
		}
	});
});
// var arr = Array.apply(Object.create(Array.prototype), [1, 2, 3])
