/**
 * @class build.ui.tab.TabPanel
 * @extends build.ui.Panel
 */
Build('build.ui.tab.TabPanel', [ 'build::build.ui.Panel' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Panel',
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