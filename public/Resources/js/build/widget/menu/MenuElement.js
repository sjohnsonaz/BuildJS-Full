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
			this.watchValue('action');
			this.link.addEvent('click', function(element, event) {
				safe(this.action)(this, event);
			}.bind(this));
		},
		$prototype : {
			init : function() {
				this.subscribe('action', function(action) {
					if (action) {
						this.preventDefault();
					} else {
						this.allowDefault();
					}
				}.bind(this));
			},
			refreshChildren : function() {
				this.clearChildren();
				this.element.appendChild(this.link.element);
			},
			preventDefault : function(type) {
				$super().preventDefault(this)(type);
				this.link.preventDefault(type);
			},
			allowDefault : function(type) {
				$super().allowDefault(this)(type);
				this.link.allowDefault(type);
			}
		}
	});
});