/**
 * @class build.widget.carousel.Carousel
 * @extends build.ui.Switcher
 */
Build('build.widget.carousel.Carousel', [ 'build::build.ui.Switcher' ], function(define, $super) {
	define({
		$extends : 'build.ui.Switcher',
		/**
		 * @constructor
		 */
		$constructor : function Carousel() {
			$super(this)();
			this.container = document.createElement('div');
			this.container.className = 'carousel-container';
			//this.container.style.left = '0px';
			this.innerElement = this.container;
			this.element.appendChild(this.container);
			//this.element.style.height = '0px';
		},
		$prototype : {
			toggleChildElement : function(element, toggle) {
				if (toggle) {
					var children = Array.prototype.slice.call(this.innerElement.children);
					var length = children.length;
					var position = children.indexOf(element);
					if (length) {
						//value = ((value % length) + length) % length;
						var left = 0;
						for (var index = 0; index < position; index++) {
							left += children[index].scrollWidth;
						}
						this.container.style.left = -left + 'px';
						this.element.style.height = element.scrollHeight + 'px';
						var self = this;
						window.setTimeout(function() {
							self.element.style.height = 'auto';
						}, 500);
					}
				}
			},
			initializeChild : function(child) {
				return child;
			},
			cleanupChild : function(child) {
				return child;
			}
		}
	});
});