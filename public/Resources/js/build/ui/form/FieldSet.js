/**
 * @class build.ui.form.FieldSet
 * @extends build.ui.element.Element
 */
Build('build.ui.form.FieldSet', [ 'build::build.ui.Container', 'build::build.ui.form.Legend' ], function(define, $super) {
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
			this.legend = build.ui.form.Legend.create(text);
			this.children.push(this.legend);
		},
		$prototype : {
			type : 'fieldset',
		}
	});
});