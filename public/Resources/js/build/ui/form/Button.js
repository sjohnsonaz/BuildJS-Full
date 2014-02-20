Build('build.ui.form.Button', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function() {
			$super(this)(text);
			this.type = 'button';
			this.text = ko.observable(text || 'Button');
		},
		$prototype : {
			build : function() {
				ko.applyBindingsToNode(this.element, {
					text : this.text
				});
			}
		}
	});
});