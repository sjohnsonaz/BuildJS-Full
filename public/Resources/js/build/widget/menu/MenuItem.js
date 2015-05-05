/**
 * @class build.widget.menu.MenuItem
 * @extends build.ui.Widget
 */
Build('build.widget.menu.MenuItem', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function MenuItem(text, link, action) {
			$super(this)();
			var self = this;
			var link = document.createElement('a');
			this.watchValue('link', link || '#', function(value) {
				return link.href;
			}, function(value, cancel, hidden) {
				link.href = value;
				return value;
			});
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
			this.watchValue('action', action);
			this.element.appendChild(link);
		},
		$prototype : {
			type : 'li'
		}
	});
});