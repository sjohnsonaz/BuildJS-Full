/**
 * @class build.widget.carousel.CarouselPager
 * @extends build.ui.Container
 */
Build('build.widget.carousel.CarouselPager', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function CarouselPager(carousel) {
			$super(this)();
			this.carousel = carousel;
		},
		$prototype : {
			template : {
				create : function(child, parent) {
					var link = document.createElement('a');
					link.innerHTML = '';
					link.addEventListener('click', function(event) {
						event.preventDefault();
						parent.carousel.activeChild = child;
					}.bind(this));
					return link;
				},
				destroy : function(child, element) {

				}
			}
		}
	});
});