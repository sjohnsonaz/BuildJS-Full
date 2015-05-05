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
		$constructor : function IframeUpload() {
			$super(this)();
			var self = this;
			this.element.addEventListener('onload', function() {
				console.log(self.element.innerHTML);
			});
			this.createUploader();
		},
		$prototype : {
			type : 'iframe',
			clearUploader : function() {
				while (this.element.firstChild) {
					this.element.removeChild(this.element.firstChild);
				}
			},
			createUploader : function() {
				this.clearUploader();
				var iframeDocument = this.element.contentDocument || this.element.contentWindow.document;
				iframeDocument.open();
				iframeDocument.write('<html><body></body></html>');
				iframeDocument.close();
				var iframeBody = iframeDocument.body;
				
				var form = iframeDocument.createElement('form');
				var fileInput = iframeDocument.createElement('input');
				fileInput.type = 'file';
				form.appendChild(fileInput);
				fileInput.addEventListener('change', function(event) {
					form.submit();
				});
				iframeBody.appendChild(form);
			}
		}
	});
});