Build('build.ui.form.FormElement', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function FormElement(text, value) {
			$super(this)(text);
		},
		$prototype : {
			init : function(text, value) {
				$super().init(this)(text);
				this.value = value || '';
				this.element.addEventListener('change', function() {
					this.value = this.element.value;
				}.bind(this));
			}
		}
	});
});