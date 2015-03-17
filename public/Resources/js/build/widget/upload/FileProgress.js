/**
 * @class build.widget.upload.FileProgress
 * @extends build.ui.Widget
 */
Build('build.widget.upload.FileProgress', [ 'build::build.ui.Widget', 'build::build.widget.progress.ProgressBar' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function FileProgress() {
			$super(this)();
			var self = this;
			var fileName = document.createElement('div');
			fileName.classname = 'file-progress-file-name';
			this.element.appendChild(fileName);
			this.progressBar = build.widget.progress.ProgressBar.create();
			this.element.appendChild(this.progressBar.element);
			this.watchValue('file', undefined, undefined, function(value) {
				fileName.innerHTML = value ? value.name : '';
				return value;
			});
		}
	});
});