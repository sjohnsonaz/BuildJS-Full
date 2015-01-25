/**
 * @class build.container.table.TableBody
 * @extends build.ui.Container
 */
Build('build.container.table.TableBody', [ 'build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TableBody() {
			$super(this)();
		},
		$prototype : {
			type : 'tbody'
		}
	});
});