/**
 * @class build.widget.carousel.CarouselPager
 * @extends build.ui.Container
 */
Build('build.widget.carousel.CarouselPager', [ 'build::build.ui.Container', 'build::build.ui.Content', 'build::build.binding.PropertyBinding', 'build::build.binding.ClassNameBinding' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		/**
		 * @constructor
		 */
		$constructor : function CarouselPager(carousel, carouselSlider) {
			$super(this)();
			this.carousel = carousel;
			this.carouselSlider = carouselSlider;
		},
		$prototype : {
			template : {
				create : function(child, parent) {
					var self = this;
					var link = build.ui.Content.createType('a');
					link.addEventListener('click', function(event) {
						event.preventDefault();
						parent.carouselSlider.activeChild = child;
						parent.carousel.resetInterval();
					});
					build.binding.PropertyBinding.create({
						destination : link,
						sources : [ {
							source : child,
							property : '$index'
						}, ],
						property : 'text'
					});
					build.binding.ClassNameBinding.create({
						destination : link,
						format : function() {
							return child.parent.children[child.parent.active] == child;
						},
						sources : [ {
							source : child.parent,
							property : 'active'
						} ],
						className : 'carousel-pager-active'
					});

					return link.element;
				},
				destroy : function(child, element) {

				}
			}
		}
	});
});