/**
 * @class build.ui.Content
 * @extends build.ui.Widget
 */
Build('build.ui.Content', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		/**
		 * @property text
		 * @property rawText
		 */
		$constructor : function Content(text) {
			$super(this)();
			this.watchProperty('text', 'innerHTML', text || '', null, function(value, current, cancel) {
				return this.formatString(value, this);
			}, this);
			this.watchProperty('rawText', 'innerHTML');
		}
	});
});