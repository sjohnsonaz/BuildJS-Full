Build('build.ui.form.FormControl', [ 'build::build.ui.form.FormElement' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function FormControl(label, control) {
			$super(this)();
			this.type = 'div';
			this.watch('label', label, null, function(value) {
				this.children.set(0, value);
			}.bind(this));
			this.watch('control', control, null, function(value) {
				this.children.set(1, value);
			}.bind(this));
		},
		$prototype : {
			init : function(label, control) {
				$super().init(this)();
				this.label = label;
				this.control = control;
				label.control = control;
			}/*,
			refreshChildren : function() {
				var element = this.element;
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				if (this.children) {
					var labelDiv = document.createElement('div');
					labelDiv.className = 'form-control-label';
					labelDiv.appendChild(this.label.element || this.label);
					this.element.appendChild(labelDiv);

					var controlDiv = document.createElement('div');
					controlDiv.className = 'form-control-control';
					controlDiv.appendChild(this.control.element || this.control);
					this.element.appendChild(controlDiv);
				}
			}*/
		}
	});
});