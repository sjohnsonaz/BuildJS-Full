Build('build.widget.menu.ExpandableMenuWidget', [ 'build::build.widget.menu.MenuWidget', 'build::build.ui.form.Button' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.widget.menu.MenuWidget',
		$constructor : function() {
			$super(this)();
			this.expandButton = build.ui.form.Button.create('{{i:bars}}');
			this.expandButton.addClass('expand-button');
		},
		$prototype : {
			refreshChildren : function() {
				$super().refreshChildren(this)();
				this.element.insertBefore(this.expandButton.element, this.element.firstChild);
			}
		}
	});
});