/**
 * @class build.form.input.Button
 * @extends build.ui.Content
 */
Build('build.form.input.Button', [ 'build::build.ui.Content' ], function(define, $super) {
	define({
		$extends : 'build.ui.Content',
		/**
		 * @constructor
		 */
		/**
		 * @property type
		 */
		$constructor : function Button(text) {
			$super(this)(text);
			this.element.type = 'button';
			this.watchProperty('name');
		},
		$prototype : {
			type : 'button'
		}
	});
});