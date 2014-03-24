Build('build.ui.form.Button', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function(text) {
			$super(this)(text);
			this.type = 'button';
			this.text = ko.observable(text || 'Button');
		},
		$prototype : {
			build : function() {
				this.element.type = 'button';
				ko.applyBindingsToNode(this.element, {
					text : this.text
				});
			}
		}
	});
});