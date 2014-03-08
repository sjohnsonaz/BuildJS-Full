Build('build.ui.form.Form', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function() {
			$super(this)();
			this.type = 'form';
			this.method = ko.observable('GET');
			this.action = ko.observable('');
			var modelHidden = ko.observable();
			this.model = ko.computed({
				read : function() {
					model = modelHidden();
					this.unwrap(model);
					return model;
				},
				write : function(value) {
					this.wrap(ko.unwrap(value));
					modelHidden(value);
				},
				owner : this
			});
		},
		$prototype : {
			build : function() {
				$super().build(this)();
				ko.applyBindingsToNode(this.element, {
					attr : {
						'method' : this.method,
						'action' : this.action
					}
				});
			},
			wrap : function(model) {
			},
			unwrap : function(model) {
			}
		}
	});
});