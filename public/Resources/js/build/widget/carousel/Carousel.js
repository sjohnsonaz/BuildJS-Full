/**
 * @class build.widget.carousel.Carousel
 * @extends build.ui.Widget
 */
Build('build.widget.carousel.Carousel', [ 'build::build.ui.Widget', 'build::build.widget.carousel.CarouselSlider', 'build::build.widget.carousel.CarouselPager' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Carousel() {
			$super(this)();
			var self = this;
			var interval = undefined;
			function setInterval(value) {
				window.clearInterval(interval);
				if (value && value > 0) {
					interval = window.setInterval(function() {
						self.carouselSlider.active++;
					}, value);
				}
			}
			this.resetInterval = function() {
				setInterval(self.interval);
			};
			this.watchValue('interval', 0, undefined, function(value) {
				setInterval(value);
				return value;
			});

			this.carouselBody = document.createElement('div');
			this.carouselBody.className = 'carousel-body';

			this.leftButton = document.createElement('a');
			this.leftButton.className = 'carousel-left-button';
			this.leftButton.innerHTML = this.formatString('{i:[angle-left]}');
			this.leftButton.addEventListener('click', function(event) {
				self.carouselSlider.active--;
				self.resetInterval();
			});

			this.carouselSlider = build.widget.carousel.CarouselSlider.create();
			this.carouselSizer = document.createElement('div');
			this.carouselSizer.className = 'carousel-sizer';
			this.carouselSizer.appendChild(this.carouselSlider.element);

			this.rightButton = document.createElement('a');
			this.rightButton.className = 'carousel-right-button';
			this.rightButton.innerHTML = this.formatString('{i:[angle-right]}');
			this.rightButton.addEventListener('click', function(event) {
				self.carouselSlider.active++;
				self.resetInterval();
			});

			this.pager = build.widget.carousel.CarouselPager.create(this, this.carouselSlider);
			this.pager.className = 'carousel-pager';
			build.binding.ForEachBinding.create({
				destination : this.pager,
				source : this.carouselSlider,
				property : 'children'
			});

			this.carouselBody.appendChild(this.leftButton);
			this.carouselBody.appendChild(this.carouselSizer);
			this.carouselBody.appendChild(this.rightButton);
			this.element.appendChild(this.carouselBody);
			this.element.appendChild(this.pager.element);
		}
	});
});