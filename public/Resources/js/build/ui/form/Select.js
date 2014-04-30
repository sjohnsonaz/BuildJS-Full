Build('build.ui.form.Select', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function() {
			$super(this)();
			this.type = 'select';
			this.options = [];
		},
		$prototype : {
			addOption : function(value, text) {
				var option = document.createElement('option');
				option.value = value;
				option.innerHTML = text;
				this.element.appendChild(option);
			}
		}
	});
});