Build('build.ui.form.Span', [ 'build::build.ui.Widget' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function(text) {
			$super(this)();
			this.type = 'span';
			this.text = ko.observable(text || '');
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				ko.applyBindingsToNode(this.element, {
					text : this.text
				});
			}
		}
	});
});