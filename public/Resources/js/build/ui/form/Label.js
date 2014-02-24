Build('build.ui.form.Label', [ 'build::build.ui.form.FormElement' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function(text, control) {
			$super(this)();
			this.type = 'label';
			this.text = ko.observable(text);
			this.control = ko.observable(control);
			var self = this;
			this.forId = ko.computed(function() {
				var control = self.control();
				if (control) {
					control = control.element || control;
				}
				if (control) {
					return ko.unwrap(control.id);
				} else {
					return undefined;
				}
			});
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				ko.applyBindingsToNode(this.element, {
					text : this.text
				});
				ko.applyBindingsToNode(this.element, {
					attr : {
						'for' : this.forId
					}
				});
			}
		}
	});
});