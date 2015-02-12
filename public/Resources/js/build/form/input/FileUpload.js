/**
 * @class build.form.input.FileUpload
 * @extends build.ui.Container
 */
Build('build.form.input.FileUpload', [ 'build::build.ui.Container' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
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