Build('build.ui.form.Header1', [ 'build::build.ui.Widget' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function(title) {
			$super(this)();
			this.type = 'h1';
			this.title = ko.observable(title || '');
		},
		$prototype : {
			build : function(callback) {
				$super().build(this)(callback);
				ko.applyBindingsToNode(this.element, {
					text : this.title
				});
			}
		}
	});
});