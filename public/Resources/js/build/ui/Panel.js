Build('build.ui.Panel', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function(parameters) {
			this.children = ko.observableArray();
			$super(this)(parameters);
		},
		$prototype : {
			build : function() {
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