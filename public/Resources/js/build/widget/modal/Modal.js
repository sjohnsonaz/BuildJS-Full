/**
 * @class build.widget.modal.Modal
 * @extends build.ui.Container
 */
Build('build.widget.modal.Modal', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		/**
		 * @property mask
		 * @property body
		 */
		$constructor : function() {
			$super(this)();
			this.mask = document.createElement('div');
			this.mask.className = 'modal-mask';
			this.body = document.createElement('div');
			this.body.className = 'modal-body';
		},
		$prototype : {
			/**
			 * 
			 */
			init : function() {
				$super().init(this)();
				this.mask.appendChild(this.body);
			},
			/**
			 * 
			 */
			refreshChildren : function() {
				var element = this.body;
				if (element) {
					this.clearChildren(element);
					if (this.children) {
						this.children.forEach(this.childIterator.bind(this));
					}
				}
			},
			/**
			 * 
			 */
			show : function() {
				document.body.appendChild(this.body);
			},
			/**
			 * 
			 */
			hide : function() {
				document.body.removeChild(this.body);
			}
		}
	});
});