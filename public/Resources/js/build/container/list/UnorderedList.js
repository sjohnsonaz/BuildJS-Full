/**
 * @class build.container.list.UnorderedList
 * @extends build.ui.Container
 */
Build('build.container.list.UnorderedList', [ 'build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function UnorderedList() {
			$super(this)();
		},
		$prototype : {
			type : 'ul'
		}
	});
});