/**
 * @class build.form.Form
 * @extends build.ui.Container
 */
Build('build.form.Form', [ 'build::build.ui.Container' ], function($define, $super) {
	// TODO: Create navigation prevention on form change.
	$define({
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
			this.watchProperty('method', 'method', 'GET');
			this.watchProperty('action', 'action', '');
		},
		$prototype : {
			type : 'form',
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