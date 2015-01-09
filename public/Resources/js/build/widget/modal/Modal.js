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
			this.watchValue('open', false);
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

			build.binding.ClassNameBinding.create(this, {
				format : '{0}',
				sources : [ {
					source : this,
					property : 'open'
				} ],
				className : 'modal-open'
			});
		},
		$prototype : {
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