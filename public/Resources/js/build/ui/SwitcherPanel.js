Build('build.ui.SwitcherPanel', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(active) {
			$super(this)();
			this.active = ko.observable(active || 0);
		},
		$prototype : {
			build : function() {
				//$super().build(this)();
				var div = document.createElement('div');
				var self = this;
				ko.applyBindingsToNode(div, {
					'element' : ko.computed(function() {
						return self.children()[self.active()];
					})
				});
				this.element.appendChild(div);
			}
		}
	});
});