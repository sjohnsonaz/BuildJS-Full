/**
 * @class build.widget.upload.IframeUpload
 * @extends build.ui.Widget
 */
Build('build.widget.upload.IframeUpload', [ 'build::build.ui.Widget' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function IframeUpload(src) {
			$super(this)();
			var self = this;
			this.watchValue('src', src);
			this.watchValue('uploading', false);
			this.element.addEventListener('load', function() {
				if (self.uploading) {
					self.uploading = false;
					console.log(self.element.innerHTML);
				}
				self.createUploader();
			});
		},
		$prototype : {
			type : 'iframe',
			clearUploader : function() {
				while (this.element.firstChild) {
					this.element.removeChild(this.element.firstChild);
				}
			},
			createUploader : function() {
				var self = this;
				this.clearUploader();
				var iframeDocument = this.element.contentDocument || this.element.contentWindow.document;
				iframeDocument.open();
				iframeDocument.write('<html><body></body></html>');
				iframeDocument.close();
				var iframeBody = iframeDocument.body;

				var form = iframeDocument.createElement('form');
				form.action = this.src;
				var fileInput = iframeDocument.createElement('input');
				fileInput.type = 'file';
				form.appendChild(fileInput);
				fileInput.addEventListener('change', function(event) {
					self.uploading = true;
					form.submit();
				});
				iframeBody.appendChild(form);
			}
		}
	});
});