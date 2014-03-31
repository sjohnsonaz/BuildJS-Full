Build('build.ui.SwitcherPanel', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function SwitcherPanel(active) {
			$super(this)();
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