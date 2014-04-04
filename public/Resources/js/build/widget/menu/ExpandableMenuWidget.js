Build('build.widget.menu.ExpandableMenuWidget', [ 'build::build.widget.menu.MenuWidget', 'build::build.ui.form.Button' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.widget.menu.MenuWidget',
		$constructor : function ExpandableMenuWidget() {
			$super(this)();
			this.expandButton = build.ui.form.Button.create('{{i:bars}}');
			this.expandButton.addClass('expand-button');
			this.expandButton.addEvent('click', function(button, event) {
				this.expand = !this.expand;
			}.bind(this));
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.watchClass('expand', 'expandable-menu-widget-expand');
				this.expand = false;
			},
			refreshChildren : function() {
				$super().refreshChildren(this)();
				this.element.insertBefore(this.expandButton.element, this.element.firstChild);
			}
		}
	});
});