/**
 * @class build.widget.menu.ExpandableMenuTop
 * @extends build.widget.menu.MenuTop
 */
Build('build.widget.menu.ExpandableMenuTop', [ 'build::build.widget.menu.MenuTop', 'build::build.form.input.Button', 'build::build.widget.menu.MenuTitle' ], function($define, $super) {
	$define({
		$extends : 'build.widget.menu.MenuTop',
		/**
		 * @constructor
		 */
		/**
		 * @property title
		 * @property expandButton
		 */
		$constructor : function ExpandableMenuTop() {
			$super(this)();
			var self = this;
			this.title = build.widget.menu.MenuTitle.create();
			this.expandButton = build.form.input.Button.create('{i:[bars]}');
			this.expandButton.addClass('expand-button');
			this.expandButton.addEventListener('click', function(button, event) {
				self.expand = !self.expand;
			});
			this.watchClass('expand', 'expandable-menu-widget-expand', false);
			this.innerElement = document.createElement('div');
			this.innerElement.className = 'menu-body';
			this.element.appendChild(this.innerElement);
			this.element.insertBefore(this.title.element, this.element.firstChild);
			this.element.insertBefore(this.expandButton.element, this.element.firstChild);
		}
	});
});