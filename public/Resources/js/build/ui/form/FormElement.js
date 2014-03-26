Build('build.ui.form.FormElement', [ 'build::build.ui.element.Element' ], function(define, $super) {
	define({
		$extends : 'build.ui.element.Element',
		$constructor : function() {
			$super(this)();
		},
		$prototype : {
			build : function() {
				Object.defineProperty(this, 'value', {
					get : function() {
						return this.element.value;
					},
					set : function(value) {
						this.element.value = value;
						this.publish(value);
					}
				});
				this.element.addEventListener('change', function() {
					this.value = this.element.value;
				}.bind(this));
			}
		}
	});
});