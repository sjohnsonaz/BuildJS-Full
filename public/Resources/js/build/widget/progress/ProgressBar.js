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
			this.progressElement = document.createElement('div');
			this.watchValue('progress', progress || 0, undefined, function(value) {
				value = parseFloat(value);
				return typeof value === 'number' ? (value >= 0 ? (value <= 100 ? value : 100) : 0) : 0;
			});
			this.watchValue('showPercentage', true);
			this.watchValue('complete', false);
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
				} ],
				output : function(progress, showPercentage, complete) {
					if (complete) {
						this.progressElement.innerHTML = 'Complete';
						this.progressElement.style.width = '100%';
					} else {
						this.progressElement.innerHTML = progress + (this.showPercentage ? '%' : '');
						this.progressElement.style.width = progress + '%';
					}
				}.bind(this)
			});
			this.element.appendChild(this.progressElement);
		}
	});
});