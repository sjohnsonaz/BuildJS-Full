Build('build.ui.SwitcherPanel', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function(active) {
			$super(this)();
			/*var activeHidden = ko.observable();
			this.active = ko.computed({
				read : function() {
					return activeHidden();
				},
				write : function(value) {
					switch (typeof value) {
					case 'object':
						var index = this.children().indexOf(value);
						if (index != -1) {
							activeHidden(index);
						}
						break;
					case 'number':
						activeHidden(value);
						break;
					}
				}
			});
			this.active(active || 0);
			*/
			this.active = ko.observable(active || 0);
		},
		$prototype : {
			build : function() {
				// $super().build(this)();
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