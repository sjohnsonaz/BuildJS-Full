/**
 * @class demo.example.widget.ProgressBarExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.ProgressBarExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.progress.ProgressBar' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function ProgressBarExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Progress Bars');
			this.addChild(header0);

			var progressBar = build.widget.progress.ProgressBar.create(50);
			this.addChild(progressBar);
		}
	});
});