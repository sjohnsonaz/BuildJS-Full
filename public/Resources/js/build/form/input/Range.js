/**
 * @class build.form.input.Range
 * @extends build.ui.Widget
 */
Build('build.form.input.Range', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Range() {
			$super(this)();
			this.watchProperty('value');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
			this.element.addEventListener('change', function() {
				this.value = this.element.value;
			}.bind(this));
			// TODO: Not supported in IE9.
			try {
				this.element.type = 'range';
			} catch (error) {

			}
		},
		$prototype : {
			type : 'input'
		}
	});
});