Build('build.ui.form.Form', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function() {
			$super(this)();
			this.type = 'form';
			var modelHidden = ko.observable();
			this.model = ko.computed({
				read : function() {
					return this.unwrap(modelHidden());
				},
				write : function(value) {
					this.wrap(ko.unwrap(value));
					modelHidden(value);
				},
				owner : this
			});
		},
		$prototype : {
			wrap : function(model) {
			},
			unwrap : function(model) {
				return model;
			}
		}
	});
});