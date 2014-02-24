Build('build.ui.form.FieldSet', [ 'build::build.ui.form.Form' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function(title) {
			$super(this)();
			this.type = 'fieldset';
			this.title = ko.observable(title);
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				var legend = document.createElement('legend');
				ko.applyBindingsToNode(legend, {
					text : this.title
				});
				this.element.insertBefore(legend, this.element.firstChild);
			}
		}
	});
});