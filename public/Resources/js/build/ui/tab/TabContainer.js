Build('build.ui.tab.TabContainer', [ 'build::build.ui.SwitcherPanel' ], function(define, $super) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		$constructor : function() {
			$super(this)();
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				var ul = document.createElement('ul');
				var li = document.createElement('li');
				li.dataset.bind = 'text: title';
				ul.appendChild(li);
				ko.applyBindingsToNode(ul, {
					foreach : this.children,
				});
				this.element.insertBefore(ul, this.element.firstChild);
			}
		}
	});
});