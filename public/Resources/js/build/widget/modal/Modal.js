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
		$constructor : function Modal() {
			$super(this)();
			this.watchClass('open', 'modal-open', false);
			this.watchValue('clickToClose', true);
			this.mask = document.createElement('div');
			this.mask.className = 'modal-mask';
			this.scroller = document.createElement('div');
			this.scroller.className = 'modal-scroll';
			this.body = document.createElement('div');
			this.body.className = 'modal-content';

			this.innerElement = this.body;
			this.scroller.appendChild(this.body);
			this.element.appendChild(this.mask);
			this.element.appendChild(this.scroller);

			this.scroller.addEventListener('click', function() {
				if (this.clickToClose) {
					this.open = false;
				}
			}.bind(this));
		},
		$prototype : {}
	});
});