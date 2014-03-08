Build('build.ui.form.Text', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function(text) {
			$super(this)(text);
			this.type = 'input';
			this.text = ko.observable(text || '');
			this.placeholder = ko.observable('');
			this.name = ko.observable('');
		},
		$prototype : {
			build : function() {
				this.element.type = 'text';
				ko.applyBindingsToNode(this.element, {
					value : this.text
				});
				ko.applyBindingsToNode(this.element, {
					attr : {
						'placeholder' : this.placeholder,
						'name' : this.name
					}
				});
			}
		}
	});
});