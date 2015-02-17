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
			showChild : function(child, current) {
				// Main element is auto auto.
				// Container is auto auto.
				// All children except active are hidden and auto auto
				// Active child is visible.
				child = typeof child !== 'undefined' ? (child.element || child) : undefined;
				;
				current = typeof current !== 'undefined' ? (current.element || current) : undefined;
				var width = this.element.scrollWidth;
				if (width && child) {
					var children = Array.prototype.slice.call(this.innerElement.children);
					var length = children.length;
					var currentPosition = children.indexOf(current || current);
					currentPosition = currentPosition == -1 ? 0 : currentPosition;
					var position = children.indexOf(child || child);
					position = position == -1 ? 0 : position;
					if (length) {
						// Main element is set to height of old active child.
						// All children are set to visible, width = element.width.
						// Container is set to correct left value for old active child, width = children.length * element.width
						this.element.style.width = this.element.scrollWidth + 'px';
						this.element.style.height = this.element.scrollHeight + 'px';
						this.container.style.width = (length * width) + 'px';
						this.container.style.left = (-currentPosition * width) + 'px';
						for (var index = 0; index < length; index++) {
							var tempChild = children[index];
							tempChild.classList.remove('hidden-soft');
							tempChild.style.width = width + 'px';
							tempChild.style.float = 'left';
						}
						var self = this;

						window.setTimeout(function() {
							// Main element is set to height of new active child.
							// Container is set to correct left value for new active child.
							self.element.style.height = child.scrollHeight + 'px';
							self.container.style.left = (-position * width) + 'px';

							window.setTimeout(function() {
								// All children except active are hidden and auto auto
								// Main element is auto auto.
								// Container is auto auto.
								for (var index = 0; index < length; index++) {
									var tempChild = children[index];
									tempChild.style.width = 'auto';
									tempChild.style.float = 'none';
									if (tempChild != child) {
										tempChild.classList.add('hidden-soft');
									}
								}
								self.element.style.width = 'auto';
								self.element.style.height = 'auto';
								self.container.style.width = 'auto';
								self.container.style.left = 'auto';
							}, 500);
						}, 100);
					}
				} else {
					if (child) {
						child.classList.remove('hidden-soft');
					}
					if (current) {
						current.classList.add('hidden-soft');
					}
				}
			},
		//initializeChild : function(child) {
		//return child;
		//},
		//cleanupChild : function(child) {
		//return child;
		//}
		}
	});
});