/**
 * @class demo.example.widget.CarouselExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.CarouselExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.carousel.Carousel' , 'build::build.ui.Content'], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function MediaExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Carousel');
			this.addChild(header0);

			carousel = build.widget.carousel.Carousel.create();
			var slide0 = build.ui.Content.create('Slide 0');
			carousel.addChild(slide0);
			var slide1 = build.ui.Content.create('Slide 1');
			carousel.addChild(slide1);
			var slide2 = build.ui.Content.create('Slide 2');
			carousel.addChild(slide2);

			this.addChild(carousel);
		}
	});
});

var carousel;