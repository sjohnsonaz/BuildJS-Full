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
		$constructor : function MenuItem() {
			$super(this)();
			var self = this;
			var link = document.createElement('a');
			this.watchValue('link', '#', function(value) {
				return self.link.href;
			}, function(value, cancel, hidden) {
				self.link.href = value;
				return value;
			});
			this.watchValue('text', '', function(value) {
				return self.link.innerHTML;
			}, function(value, cancel, hidden) {
				self.link.innerHTML = value;
				return self.link.innerHTML;
			});
			this.watchValue('action');
			this.element.appendChild(link);
		},
		$prototype : {
			type : 'li'
		}
	});
});