Build('build.ui.form.Header1', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function(parameters) {
			parameters = parameters || {};
			parameters.type = parameters.type = 'h1';
			this.title = ko.observable('');
			$super(this)(parameters);
		},
		$prototype : {
			build : function() {
				ko.applyBindingsToNode(this.element, {
					text : this.title
				});
			}
		}
	});
});