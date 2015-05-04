/**
 * @class build.widget.menu.Menu
 * @extends build.ui.Container
 */
Build('build.widget.menu.Menu', [ 'build::build.ui.Container', 'build::build.widget.menu.MenuItem', 'build::build.widget.menu.MenuContainer', 'build::build.utility.Animation' ], function(define, $super) {
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
			this.watchValue('rawText', text || '', function(value) {
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
			this.watchClass('open', 'menu-open', !!open);
			this.element.appendChild(link);
			this.innerElement = document.createElement('ul');
			this.element.appendChild(this.innerElement);
			this.template = {
				create : function(child, parent) {
					switch (typeof child) {
					case 'object':
						if (child.children) {
							if (child.widget) {
								var menuContainer = build.widget.menu.MenuContainer.create(child.text, child.link, child.action, child.open);
								menuContainer.bind([ {
									handler : 'forEach',
									source : child,
								} ]);
								menuContainer.parent = parent;
								return menuContainer.element;
							} else {
								var menu = build.widget.menu.Menu.createType('li', child.text, child.link, child.action, child.open);
								menu.bind([ {
									handler : 'forEach',
									source : child,
								} ]);
								menu.parent = parent;
								return menu.element;
							}
						} else {
							var menuItem = build.widget.menu.MenuItem.create(child.text, child.link, child.action);
							menuItem.parent = parent;
							return menuItem.element;
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
			link.addEventListener('click', function(event) {
				event.preventDefault();
				//self.open = !self.open;
			});
			self.element.addEventListener('mouseenter', function(event) {
				self.open = true;
			});
			self.element.addEventListener('mouseleave', function(event) {
				self.open = false;
			});
			this.subscribe('open', function(value) {
				if (self.parent instanceof build.widget.menu.Menu) {
					if (value) {
						self.innerElement.style.overflow = 'hidden';
						build.utility.Animation.animate(self.innerElement, {
							height : 'auto'
						}, 300, function() {
							self.innerElement.style.overflow = 'visible';
						});
					} else {
						self.innerElement.style.overflow = 'hidden';
						build.utility.Animation.animate(self.innerElement, {
							height : 0
						}, 300, function() {
						});
					}
				}
			});
		},
		$prototype : {
			type : 'div',
			iteratorType : 'li'
		}
	});
});