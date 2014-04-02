Build('build.ui.form.Label', [ 'build::build.ui.form.FormElement' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function Label(text, control) {
			$super(this)(text);
			this.type = 'label';
			this.watchValue('control', control);
			this.watchAttribute('forId', 'for');
		},
		$prototype : {
			init : function(text, control) {
				$super().init(this)(text);
				this.subscribe('control', function(value) {
					if (this.control) {
						var control = this.control.element || this.control;
						this.forId = control.id;
					} else {
						this.forId = '';
					}
				}.bind(this));
			}
		}
	});
});