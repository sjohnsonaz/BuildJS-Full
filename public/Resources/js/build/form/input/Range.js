/**
 * @class build.form.input.Range
 * @extends build.ui.Widget
 * Browser Support: IE10+
 */
Build('build.form.input.Range', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Range() {
			$super(this)();
			var self = this;
			this.watchProperty('value');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
			this.element.addEventListener('change', function() {
				self.value = self.element.value;
			});
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