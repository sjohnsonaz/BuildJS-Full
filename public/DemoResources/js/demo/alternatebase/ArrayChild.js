Build('demo.alternatebase.ArrayChild', [ 'demo::demo.alternatebase.ArrayBase' ], function($define, $super) {
	$define({
		$extends : 'demo.alternatebase.ArrayBase',
		$constructor : function ArrayChild() {
			this.test2 = 2;
		},
		$prototype : {
			test3 : 3
		}
	});
});