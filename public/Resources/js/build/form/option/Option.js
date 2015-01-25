Build('build.form.option.Option', [ 'build::build.ui.Content' ], function(define, $super) {
	define({
		$extends : 'build.ui.Content',
		$constructor : function Option(text, value, selected, disabled, label) {
			$super(this)(text);
			this.watchProperty('value', 'value', value);
			this.watchProperty('selected', 'selected', selected);
			this.watchProperty('disabled', 'disabled', disabled);
			this.watchProperty('label', 'label', label);
		},
		$prototype : {
			type : 'option'
		}
	});
});