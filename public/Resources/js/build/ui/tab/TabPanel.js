/**
 * @class build.ui.tab.TabPanel
 * @extends build.ui.Container
 */
Build('build.ui.tab.TabPanel', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 * @param title
		 */
		/**
		 * @property title
		 */
		$constructor : function TabPanel(title) {
			$super(this)();
			this.watchValue('title', title || 'Tab');
		},
		$prototype : {}
	});
});