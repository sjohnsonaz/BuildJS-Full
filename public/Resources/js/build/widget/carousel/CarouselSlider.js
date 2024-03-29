/**
 * @class build.widget.carousel.CarouselSlider
 * @extends build.ui.Switcher
 */
Build('build.widget.carousel.CarouselSlider', [ 'build::build.ui.Switcher', 'build::build.widget.carousel.CarouselPager', 'build::build.binding.ForEachBinding' ], function(define, $super) {
	define({
		$extends : 'build.ui.Switcher',
		/**
		 * @constructor
		 */
		$constructor : function CarouselSlider() {
			$super(this)();
			this.outer = this.element;
			this.container = document.createElement('div');
			this.container.className = 'carousel-slider-container';
			this.innerElement = this.container;
			this.outer.appendChild(this.container);
			this.finished = true;
		},
		$prototype : {
			showChild : function(child, current) {
				/*
				 * Main element is auto auto.
				 * Container is auto auto.
				 * All children except active are hidden and auto auto
				 * Active child is visible.
				 */
				child = typeof child !== 'undefined' ? (child.element || child) : undefined;
				current = typeof current !== 'undefined' ? (current.element || current) : undefined;
				var width = this.outer.scrollWidth;
				var children = Array.prototype.slice.call(this.innerElement.children);
				if (width && child && this.finished) {
					this.finished = false;
					var length = children.length;
					var currentPosition = children.indexOf(current || current);
					currentPosition = currentPosition == -1 ? 0 : currentPosition;
					var position = children.indexOf(child || child);
					position = position == -1 ? 0 : position;
					if (length) {
						/*
						 * Main element is set to height of old active child.
						 * All children are set to visible, width = element.width.
						 * Container is set to correct left value for old active child, width = children.length * element.width
						 */
						var clientRect = this.outer.getBoundingClientRect();
						this.outer.style.width = clientRect.width + 'px';
						this.outer.style.height = clientRect.height + 'px';
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
							if (!self.finished) {
								/*
								 * Main element is set to height of new active child.
								 * Container is set to correct left value for new active child.
								 */
								var clientRect = child.getBoundingClientRect();
								self.outer.style.height = clientRect.height + 'px';
								self.container.style.left = (-position * width) + 'px';

								window.setTimeout(function() {
									if (!self.finished) {
										self.showChildNoAnimate(child, current, children);
									}
								}, 500);
							}
						}, 100);
					}
				} else {
					this.showChildNoAnimate(child, current, children);
				}
			},
			showChildNoAnimate : function(child, current, children) {
				/*
				 * All children except active are hidden and auto auto
				 * Main element is auto auto.
				 * Container is auto auto.
				 */
				for (var index = 0, length = children.length; index < length; index++) {
					var tempChild = children[index];
					tempChild.style.width = 'auto';
					tempChild.style.float = 'none';
					if (tempChild != child) {
						tempChild.classList.add('hidden-soft');
					} else {
						tempChild.classList.remove('hidden-soft');
					}
				}
				this.outer.style.width = 'auto';
				this.outer.style.height = 'auto';
				this.container.style.width = 'auto';
				this.container.style.left = 'auto';
				this.finished = true;
			}
		}
	});
});