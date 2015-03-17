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
			var progressBarContainer = document.createElement('div');
			progressBarContainer.classList.add('file-progress-bar');
			this.progressBar = build.widget.progress.ProgressBar.create();
			progressBarContainer.appendChild(this.progressBar.element);
			this.element.appendChild(progressBarContainer);
			this.removeButton = build.form.input.Button.create('{i:[times]}');
			this.removeButton.addClass('button-danger');
			this.element.appendChild(this.removeButton.element);
			this.watchValue('file', undefined, undefined, function(value) {
				fileName.innerHTML = value ? value.name : '';
				return value;
			});
		},
		$prototype : {
			upload : function FileUpload(path) {
				var self = this;
				var reader = new FileReader();
				var request = new XMLHttpRequest();
				request.upload.addEventListener("progress", function(event) {
					if (event.lengthComputable) {
						var percentage = Math.round((event.loaded * 100) / event.total);
						self.progressBar.progress = percentage;
					}
				}, false);
				request.upload.addEventListener("load", function(event) {
					self.progressBar.progress = 100;
				}, false);
				request.open('post', path);
				request.overrideMimeType('text/plain; charset=x-user-defined-binary');
				reader.onload = function(event) {
					request.send(event.target.result);
				};
				reader.readAsBinaryString(this.file);
			},
		}
	});
});