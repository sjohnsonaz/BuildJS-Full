/**
 * @class build.container.list.OrderedList
 * @extends build.ui.Container
 */
Build('build.container.list.OrderedList', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function OrderedList() {
			$super(this)();
		},
		$prototype : {
			type : 'ol'
		}
	});
});