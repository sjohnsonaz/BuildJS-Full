/**
 * @class demo.example.input.UploadExample
 * @extends build.ui.Container
 */
Build('demo.example.input.UploadExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.upload.Upload', 'build::build.widget.upload.IframeUpload' ], function($define,
		$super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function UploadExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Upload');
			this.addChild(header0);

			var upload = build.widget.upload.Upload.create();
			var iframeUpload = build.widget.upload.IframeUpload.create();

			this.addChild(upload);
			this.addChild(iframeUpload);
		}
	});
});