/**
 * @class build.widget.upload.FileProgress
 * @extends build.ui.Widget
 */
Build('build.widget.upload.FileProgress', [ 'build::build.ui.Widget', 'build::build.widget.progress.ProgressBar', 'build::build.form.input.Button' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function FileProgress() {
			$super(this)();
			var self = this;
			var fileName = document.createElement('div');
			fileName.className = 'file-progress-name';
			this.element.appendChild(fileName);
			this.progressBar = build.widget.progress.ProgressBar.create();
			this.progressBar.classList.add('file-progress-bar');
			this.element.appendChild(this.progressBar.element);
			this.removeButton = build.form.input.Button.create('{i:[times]}');
			this.removeButton.addClass('button-danger');
			this.element.appendChild(this.removeButton.element);
			this.watchValue('file', undefined, undefined, function(value) {
				fileName.innerHTML = value ? value.name : '';
				return value;
			});
		}
	});
});