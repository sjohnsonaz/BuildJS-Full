/**
 * @class build.widget.menu.Menu
 * @extends build.ui.Container
 */
Build('build.widget.menu.Menu', [ 'build::build.ui.Container', 'build::build.widget.menu.MenuItem' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Menu(text, link, action, open) {
			$super(this)();
			var self = this;
			var link = document.createElement('a');
			this.watchValue('link', link || '#', function(value) {
				return link.href;
			}, function(value, cancel, hidden) {
				link.href = value;
				return value;
			});
			this.watchValue('text', text || '', function(value) {
				return link.innerHTML;
			}, function(value, cancel, hidden) {
				link.innerHTML = value;
				return link.innerHTML;
			});
			this.watchValue('action', action);
			this.watchClass('open', 'menu-open', !!open);
			link.addEventListener('click', function(event) {
				event.preventDefault();
				//self.open = !self.open;
			});
			this.element.appendChild(link);
			this.innerElement = document.createElement('ul');
			this.element.appendChild(this.innerElement);
			this.template = {
				create : function(child, parent) {
					switch (typeof child) {
					case 'object':
						if (child.children) {
							var menu = build.widget.menu.Menu.createType('li', child.text, child.link, child.action, child.open);
							menu.bind([ {
								handler : 'forEach',
								source : child,
							} ]);
							return menu.element;
						} else {
							return build.widget.menu.MenuItem.create(child.text, child.link, child.action).element;
						}
						break;
					case 'string':
						if (child === '|') {
							return document.createElement('div');
						} else {
							return child;
						}
						break;
					default:
						return child;
					}
				},
				destroy : function(child, element) {

				}
			};
		},
		$prototype : {
			type : 'div',
			iteratorType : 'li'
		}
	});
});