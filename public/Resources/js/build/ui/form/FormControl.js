Build('build.ui.form.FormControl', [ 'build::build.ui.form.FormElement' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function(label, control) {
			$super(this)();
			this.type = 'div';
			label.control(control);
			this.label = ko.observable(label);
			this.control = ko.observable(control);
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				var labelDiv = document.createElement('div');
				labelDiv.className = 'form-control-label';
				var controlDiv = document.createElement('div');
				controlDiv.className = 'form-control-control';
				ko.applyBindingsToNode(labelDiv, {
					element : this.label
				});
				ko.applyBindingsToNode(controlDiv, {
					element : this.control
				});
				this.element.appendChild(labelDiv);
				this.element.appendChild(controlDiv);
			}
		}
	});
});