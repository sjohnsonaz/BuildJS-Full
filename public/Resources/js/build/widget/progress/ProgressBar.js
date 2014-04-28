Build('build.widget.progress.ProgressBar', [ 'build::build.ui.Widget' ], function(define, $super, helper) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function(progress) {
			$super(this)();
			this.progressElement = document.createElement('div');
			this.watchValue('progress', progress || 0);
			this.subscribe('progress', function(value) {
				this.progressElement.style.width = value + '%';
			}.bind(this));
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.element.appendChild(this.progressElement);
			}
		}
	});
});