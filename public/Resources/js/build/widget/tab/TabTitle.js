/**
 * @class build.widget.tab.TabTitle
 * @extends build.ui.Widget
 */
Build('build.widget.tab.TabTitle', [ 'build::build.ui.Widget', 'build::build.binding.TextBinding', 'build::build.widget.tab.TabLink' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function TabTitle(text) {
			$super(this)();
			var self = this;
			var link = document.createElement('a');
			this.watchValue('rawText', undefined, function(value) {
				return link.innerHTML;
			}, function(value, cancel, hidden) {
				link.innerHTML = typeof value !== 'undefined' ? value : '';
				return link.innerHTML;
			});
			this.watchValue('text', text || '', function(value) {
				return link.innerHTML;
			}, function(value, cancel, hidden) {
				link.innerHTML = self.formatString(value, this);
				return link.innerHTML;
			});
			this.element.appendChild(link);
		},
		$prototype : {
			type : 'li',
		}
	});
});