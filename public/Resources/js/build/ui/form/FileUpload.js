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
			this.type = 'input';
			this.watchProperty('name');
		},
		$prototype : {
			init : function(name, value) {
				$super().init(this)(null, value);
				this.element.type = 'file';
				this.name = name;
			}
		}
	});
});