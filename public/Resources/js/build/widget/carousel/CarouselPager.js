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
		$constructor : function CarouselPager(carousel) {
			$super(this)();
			this.carousel = carousel;
		},
		$prototype : {
			template : {
				create : function(child, parent) {
					var link = build.ui.Content.createType('a');
					link.addEventListener('click', function(event) {
						event.preventDefault();
						parent.carousel.activeChild = child;
					}.bind(this));
					build.binding.PropertyBinding.create(link, {
						sources : [ {
							source : child,
							property : '$index'
						}, ],
						property : 'text'
					});
					build.binding.ClassNameBinding.create(link, {
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