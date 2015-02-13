/**
 * @class build.widget.canvas.Canvas
 * @extends build.ui.Widget
 */
Build('build.widget.canvas.Canvas', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Canvas() {
			$super(this)();
			var self = this;
			this.watchProperty('width');
			this.watchProperty('height');
			Object.defineProperty(this, 'context', {
				configurable : true,
				enumerable : true,
				get : function() {
					return this.element.getContext(this.contextType);
				}.bind(this)
			});
		},
		$prototype : {
			type : 'canvas',
			contextType : '2d'
		}
	});
});