/**
 * @class build.ui.form.FileUpload
 * @extends build.ui.form.FormElement
 */
Build('build.ui.form.FileUpload', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		/**
		 * @constructor
		 */
		$constructor : function FileUpload(name, value) {
			$super(this)(null, value);
			this.watchProperty('name', 'name', name);
			this.element.type = 'file';
		},
		$prototype : {
			type : 'input'
		}
	});
});