Build('build.ui.Panel', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {
			$super(this)();
			this.children = ko.observableArray();
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				var div = document.createElement('div');
				div.dataset.bind = 'element: $data';
				this.element.appendChild(div);
				ko.applyBindingsToNode(this.element, {
					foreach : this.children
				});
			},
			addChild : function(child) {
				this.children.push(child);
			},
			removeChild : function(child) {
				this.children.splice(array.indexOf(child), 1);
			}
		}
	});
});