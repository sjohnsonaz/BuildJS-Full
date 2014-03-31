Build('build.ui.form.FieldSet', [ 'build::build.ui.form.Form', 'build::build.ui.form.Legend' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function FieldSet(text) {
			$super(this)();
			this.type = 'fieldset';
			this.legend = build.ui.form.Legend.create(text);
		},
		$prototype : {
			refreshChildren : function() {
				$super().refreshChildren(this)();
				this.element.insertBefore(this.legend.element, this.element.firstChild);
			}
		}
	});
});