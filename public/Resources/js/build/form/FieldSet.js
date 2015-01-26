/**
 * @class build.form.FieldSet
 * @extends build.ui.Container
 */
Build('build.form.FieldSet', [ 'build::build.ui.Container', 'build::build.form.Legend' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 * @param text
		 */
		/**
		 * @property type
		 * @property legend
		 */
		$constructor : function FieldSet(text) {
			$super(this)();
			this.legend = build.form.Legend.create(text);
			this.children.push(this.legend);
		},
		$prototype : {
			type : 'fieldset',
		}
	});
});