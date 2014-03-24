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
					if (model) {
						this.unwrap(model || {});
					}
					return model;
				},
				write : function(value) {
					if (ko.unwrap(value)) {
						this.wrap(ko.unwrap(value));
					} else {
						this.clear();
					}
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
			preventSubmit : function() {
				this.element.addEventListener('submit', function(event) {
					event.preventDefault();
					return false;
				});
			},
			wrap : function(model) {
			},
			unwrap : function(model) {
			},
			clear : function() {
			}
		}
	});
});