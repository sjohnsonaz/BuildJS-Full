/**
 * @class build.ui.tab.TabTitle
 * @extends build.ui.Container
 */
Build('build.ui.tab.TabTitle', [ 'build::build.ui.Container', 'build::build.binding.TextBinding', 'build::build.ui.tab.TabLink' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TabTitle() {
			$super(this)();
			this.link = build.ui.tab.TabLink.create();
			this.addChild(this.link);
			this.watchValue('title', '', null, function(value, cancel) {
				this.link.text = value;
				return value;
			}.bind(this));
		},
		$prototype : {
			type : 'li',
		}
	});
});