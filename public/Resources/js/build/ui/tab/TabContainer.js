Build('build.ui.tab.TabContainer', [ 'build::build.ui.SwitcherPanel' ], function(define, $super) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		$constructor : function() {
			$super(this)();
			var self = this;
			this.openTab = function(tab) {
				var children = self.children();
				for (var index = 0, length = children.length; index < length; index++) {
					if (tab === children[index]) {
						self.openTabIndex(index);
						break;
					}
				}
			};
			this.openTabIndex = function(index) {
				self.active(index);
			};
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				var ul = document.createElement('ul');
				var li = document.createElement('li');
				var a = document.createElement('a');
				li.appendChild(a);
				ul.appendChild(li);
				li.dataset.bind = "css: { 'tab-active': $parent.active() == $index() }, attr: { 'data-index' : $index, 'data-parent' : $parent.active }";
				a.dataset.bind = 'text: title, click: $parent.openTab';
				ko.applyBindingAccessorsToNode(ul, {
					foreach : this.children,
				}, this);
				this.element.insertBefore(ul, this.element.firstChild);
			}
		}
	});
});