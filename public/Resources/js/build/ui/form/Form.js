Build('build.ui.form.Form', [ 'build::build.ui.Panel' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function() {
			$super(this)();
			this.type = 'form';
			this.watchProperty('method');
			this.watchProperty('action');
			var modelHidden = null;
			Object.defineProperty(this, 'model', {
				get : function() {
					if (modelHidden) {
						this.unwrap(modelHidden || {});
					}
					return modelHidden;
				},
				set : function(value) {
					if (value) {
						this.wrap(value);
					} else {
						this.clear();
					}
					modelHidden = value;
					this.publish('model');
				}
			});
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.method = 'GET';
				this.action = '';
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