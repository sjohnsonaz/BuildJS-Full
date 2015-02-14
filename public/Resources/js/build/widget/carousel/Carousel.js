/**
 * @class build.widget.carousel.Carousel
 * @extends build.ui.Container
 */
Build('build.widget.carousel.Carousel', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function Carousel() {
			$super(this)();
			this.container = document.createElement('div');
			this.container.className = 'carousel-container';
			this.container.style.left = '0px';
			this.innerElement = this.container;
			this.element.appendChild(this.container);
			this.element.style.height = '0px';
			this.watchValue('active', undefined, undefined, function(value, cancel) {
				if (typeof value === 'undefined') {
					value = 0;
				}
				var length = this.children.length;
				if (length) {
					value = ((value % length) + length) % length;
					var left = 0;
					for (var index = 0; index < value; index++) {
						left += this.children[index].element.scrollWidth;
					}
					this.container.style.left = -left + 'px';
					this.element.style.height = this.children[value].element.scrollHeight + 'px';
				} else {
					value = 0;
				}
				return value;
			}.bind(this));
		}
	});
});