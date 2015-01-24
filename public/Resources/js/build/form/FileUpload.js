/**
 * @class build.form.FileUpload
 * @extends build.form.FormElement
 */
Build('build.form.FileUpload', [ 'build::build.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.form.FormElement',
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