/**
 * @class build.ui.form.Form
 * @extends build.ui.Container
 */
Build('build.ui.form.Form', [ 'build::build.ui.Container' ], function(define, $super) {
	// TODO: Create navigation prevention on form change.
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 * @property method
		 * @property action
		 * @property model
		 */
		$constructor : function Form() {
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
			/**
			 * @method init
			 */
			init : function() {
				$super().init(this)();
				this.method = 'GET';
				this.action = '';
			},
			/**
			 * @method preventSubmit
			 */
			preventSubmit : function() {
				this.element.addEventListener('submit', function(event) {
					event.preventDefault();
					return false;
				});
			},
			/**
			 * @method wrap
			 * @param model
			 */
			wrap : function(model) {
			},
			/**
			 * @method unwrap
			 * @param model
			 */
			unwrap : function(model) {
			},
			/**
			 * @method clear
			 */
			clear : function() {
			}
		}
	});
});