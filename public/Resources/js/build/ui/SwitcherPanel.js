Build('build.ui.SwitcherPanel', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(active) {
			$super(this)();
			/*
			 * var activeHidden = ko.observable(); this.active = ko.computed({
			 * read : function() { return activeHidden(); }, write :
			 * function(value) { switch (typeof value) { case 'object': var
			 * index = this.children().indexOf(value); if (index != -1) {
			 * activeHidden(index); } break; case 'number': activeHidden(value);
			 * break; } } }); this.active(active || 0);
			 */
			this.watch('active', 0);
			this.subscribe('active', function(value) {
				this.refreshChildren();
			}.bind(this));
		},
		$prototype : {
			init : function(active) {
				$super().init(this)(active);
			},
			refreshChildren : function() {
				var element = this.element;
				if (element) {
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}
					if (this.children) {
						var active = this.children[this.active];
						if (active) {
							this.childIterator(active, this.active, this.children);
						}
					}
				}
			},
		}
	});
});