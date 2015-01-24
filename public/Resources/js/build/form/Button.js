/**
 * @class build.form.Button
 * @extends build.form.FormElement
 */
Build('build.form.Button', [ 'build::build.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.form.FormElement',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Button(text, value) {
			$super(this)(text, value);
			this.element.type = 'button';
		},
		$prototype : {
			type : 'button'
		}
	});
});