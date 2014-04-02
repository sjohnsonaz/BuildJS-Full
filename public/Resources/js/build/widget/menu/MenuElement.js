Build('build.widget.menu.MenuElement', [ 'build::build.ui.Widget', 'build::build.ui.element.Link' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function MenuElement() {
			$super(this)();
			this.type = 'li';
			this.link = build.ui.element.Link.create();
			Object.defineProperty(this, 'url', {
				get : function() {
					return this.link.element.href;
				},
				set : function(value) {
					this.link.element.href = value;
					this.publish('url');
				}
			});
			Object.defineProperty(this, 'text', {
				get : function() {
					return this.link.element.innerHTML;
				},
				set : function(value) {
					this.link.element.innerHTML = value;
					this.publish('text');
				}
			});
		},
		$prototype : {
			refreshChildren : function() {
				this.clearChildren();
				this.element.appendChild(this.link.element);
			}
		}
	});
});