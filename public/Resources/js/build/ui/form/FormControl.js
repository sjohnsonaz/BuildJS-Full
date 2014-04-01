Build('build.ui.form.FormControl', [ 'build::build.ui.form.FormElement' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function FormControl(label, control) {
			$super(this)();
			this.type = 'div';
			this.directAppend = true;
			this.watch('label', label, null, function(value) {
				this.children.set(0, value);
			}.bind(this));
			this.watch('control', control, null, function(value) {
				this.children.set(1, value);
			}.bind(this));
			this.labelIterator = document.createElement('div');
			this.labelIterator.className = 'form-control-iterator-label';
			this.controlIterator = document.createElement('div');
			this.controlIterator.className = 'form-control-iterator-control';
		},
		$prototype : {
			init : function(label, control) {
				$super().init(this)();
				this.label = label;
				this.control = control;
				label.control = control;
				this.element.appendChild(this.labelIterator);
				this.element.appendChild(this.controlIterator);
			},
			refreshChildren:function() {
				var element = this.element;
				if (element) {
					//this.clearChildren(this.controlIterator);
					//this.clearChildren(this.labelIterator);
					this.controlIterator.appendChild(this.control.element);
					this.labelIterator.appendChild(this.label.element);
					this.label.control = this.control;
				}
			}
		}
	});
});