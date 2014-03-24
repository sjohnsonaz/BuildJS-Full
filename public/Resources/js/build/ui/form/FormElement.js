Build('build.ui.form.FormElement', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function() {
			$super(this)();
		},
		$prototype : {
			build : function() {
				Object.defineProperty(this.element, 'val', {
					get : function() {
						return this.value;
					},
					set : function(value) {
						this.value = value;
					}
				});
				this.element.addEventListener('change', function() {
					this.val = this.value;
				});
			}
		}
	});
});