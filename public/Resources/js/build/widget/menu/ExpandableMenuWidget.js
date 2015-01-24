/**
 * @class build.widget.menu.ExpandableMenuWidget
 * @extends build.widget.menu.MenuWidget
 */
Build('build.widget.menu.ExpandableMenuWidget', [ 'build::build.widget.menu.MenuWidget', 'build::build.form.input.Button', 'build::build.widget.menu.MenuTitle' ], function(define, $super) {
	define({
		$extends : 'build.widget.menu.MenuWidget',
		/**
		 * @constructor
		 */
		/**
		 * @property title
		 * @property expandButton
		 */
		$constructor : function ExpandableMenuWidget() {
			$super(this)();
			this.title = build.widget.menu.MenuTitle.create();
			this.expandButton = build.form.input.Button.create('{i:[bars]}');
			this.expandButton.addClass('expand-button');
			this.expandButton.addEvent('click', function(button, event) {
				this.expand = !this.expand;
			}.bind(this));
			this.watchClass('expand', 'expandable-menu-widget-expand', false);
			this.innerElement = document.createElement('div');
			this.innerElement.className = 'menu-body';
			this.element.appendChild(this.innerElement);
			this.element.insertBefore(this.title.element, this.element.firstChild);
			this.element.insertBefore(this.expandButton.element, this.element.firstChild);
		}
	});
});