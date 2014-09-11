Build('build.widget.progress.ProgressBar', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function ProgressBar(progress) {
			$super(this)();
			this.progressElement = document.createElement('div');
			this.watchValue('progress', progress || 0);
			this.watchValue('showPercentage', true);
			this.subscribe('progress', function(value) {
				this.progressElement.innerHTML = this.showPercentage ? value + '%' : '';
				value = parseFloat(value);
				value = typeof value === 'number' ? (value >= 0 ? (value <= 100 ? value : 100) : 0) : 0;
				this.progressElement.style.width = value + '%';
			}.bind(this));
			this.subscribe('showPercentage', function(value) {
				this.progressElement.innerHTML = value ? this.progress + '%' : '';
			}.bind(this));
			this.element.appendChild(this.progressElement);
		}
	});
});