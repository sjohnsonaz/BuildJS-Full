/**
 * @class build.widget.progress.ProgressBar
 * @extends build.ui.Widget
 */
Build('build.widget.progress.ProgressBar', [ 'build::build.ui.Widget', 'build::build.binding.FunctionBinding' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function ProgressBar(progress) {
			$super(this)();
			var self = this;
			this.progressElement = document.createElement('div');
			this.watchValue('progress', progress || 0, undefined, function(value) {
				value = parseFloat(value);
				return typeof value === 'number' ? (value >= 0 ? (value <= 100 ? value : 100) : 0) : 0;
			});
			this.watchValue('showPercentage', true);
			this.watchClass('complete', 'progress-complete', false);
			this.watchClass('error', 'progress-error', false);
			build.binding.FunctionBinding.create(this, {
				sources : [ {
					source : this,
					property : 'progress'
				}, {
					source : this,
					property : 'showPercentage'
				}, {
					source : this,
					property : 'complete'
				}, {
					source : this,
					property : 'error'
				} ],
				output : function(progress, showPercentage, complete, error) {
					if (error) {
						self.progressElement.innerHTML = 'Error';
						self.progressElement.style.width = progress + '%';
					} else if (complete) {
						self.progressElement.innerHTML = 'Complete';
						self.progressElement.style.width = '100%';
					} else {
						self.progressElement.innerHTML = progress + (self.showPercentage ? '%' : '');
						self.progressElement.style.width = progress + '%';
					}
				}
			});
			this.element.appendChild(this.progressElement);
		}
	});
});