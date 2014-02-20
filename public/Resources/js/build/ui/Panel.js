Build('build.ui.Panel', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {
			$super(this)();
			this.children = ko.observableArray();
		},
		$prototype : {
			build : function(callback) {
				$super().build(this)(callback);
				ko.applyBindingsToNode(this.element, {
					foreachElement : this.children
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