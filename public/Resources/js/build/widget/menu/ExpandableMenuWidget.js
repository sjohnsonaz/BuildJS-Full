/**
 * @class build.widget.menu.ExpandableMenuWidget
 * @extends build.widget.menu.MenuWidget
 */
Build('build.widget.menu.ExpandableMenuWidget', [ 'build::build.widget.menu.MenuWidget', 'build::build.ui.form.Button', 'build::build.widget.menu.MenuTitle' ], function(define, $super) {
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
			this.expandButton = build.ui.form.Button.create('{{i:bars}}');
			this.expandButton.addClass('expand-button');
			this.expandButton.addEvent('click', function(button, event) {
				this.expand = !this.expand;
			}.bind(this));
		},
		$prototype : {
			/**
			 * 
			 */
			init : function() {
				$super().init(this)();
				this.watchClass('expand', 'expandable-menu-widget-expand');
				this.expand = false;
			},
			/**
			 * 
			 */
			refreshChildren : function() {
				$super().refreshChildren(this)();
				this.element.insertBefore(this.title.element, this.element.firstChild);
				this.element.insertBefore(this.expandButton.element, this.element.firstChild);
			}
		}
	});
});