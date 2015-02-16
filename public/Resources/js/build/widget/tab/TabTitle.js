/**
 * @class build.widget.tab.TabTitle
 * @extends build.ui.Container
 */
Build('build.widget.tab.TabTitle', [ 'build::build.ui.Container', 'build::build.binding.TextBinding', 'build::build.widget.tab.TabLink' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function TabTitle() {
			$super(this)();
			this.link = build.widget.tab.TabLink.create();
			this.addChild(this.link);
			this.watchValue('title', '', null, function(value, current, cancel) {
				this.link.text = value;
				return value;
			}.bind(this));
		},
		$prototype : {
			type : 'li',
		}
	});
});