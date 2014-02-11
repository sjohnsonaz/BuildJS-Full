Build('build.ui.Panel', [ 'build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {
			$super(this)();
			this.children = [];
		},
		$prototype : {
			addChild : function(child) {
				this.children.push(child);
				this.appendChild(child);
			},
			removeChild : function(child) {
				this.children.splice(array.indexOf(child), 1);
				this.removeChild(child);
			}
		}
	});
});