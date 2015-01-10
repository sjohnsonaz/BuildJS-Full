/**
 * @class build.ui.table.TableBody
 * @extends build.ui.Container
 */
Build('build.ui.table.TableBody', [ 'build.ui.Container' ], function(define, $super) {
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