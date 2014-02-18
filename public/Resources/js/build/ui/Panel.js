Build('build.ui.Panel', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function(parameters) {
			$super(this)(parameters);
			this.children = ko.observableArray();
		},
		$prototype : {
			addChild : function(child) {
				this.children.push(child);
				if (!this.template) {
					this.appendChild(child);
				}
			},
			removeChild : function(child) {
				this.children.splice(array.indexOf(child), 1);
				if (!this.template) {
					this.removeChild(child);
				}
			}
		}
	});
});