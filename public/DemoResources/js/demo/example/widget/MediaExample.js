/**
 * @class demo.example.widget.MediaExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.MediaExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.media.Audio', 'build::build.widget.media.Video' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function MediaExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Media');
			this.addChild(header0);

			var audio = build.widget.media.Audio.create();//'/DemoResources/media/testaudio.mp3');
			audio.element.controls = true;

			var video = build.widget.media.Video.create();
			video.element.controls = true;

			this.addChild(audio);
			this.addChild(video);
		}
	});
});