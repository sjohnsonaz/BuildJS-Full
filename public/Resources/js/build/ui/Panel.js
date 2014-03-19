Build('build.ui.Panel', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {
			$super(this)();
			this.children = ko.observableArray();
			this.directAppend = false;
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				if (this.directAppend) {
					ko.applyBindingsToNode(this.element, {
						foreachElement : this.children
					});
				} else {
					var div = document.createElement('div');
					div.dataset.bind = 'element: $data';
					div.className = 'panel-iterator';
					this.element.appendChild(div);
					ko.applyBindingsToNode(this.element, {
						foreach : this.children
					});
				}
			},
			addChild : function(child) {
				this.children.push(child);
			},
			removeChild : function(child) {
				this.children.splice(this.children.indexOf(child), 1);
			}
		}
	});
});