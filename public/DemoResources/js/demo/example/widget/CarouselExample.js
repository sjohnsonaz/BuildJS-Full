/**
 * @class demo.example.widget.CarouselExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.CarouselExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.carousel.Carousel', 'build::build.ui.Content' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function MediaExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Carousel');
			this.addChild(header0);

			var carousel = build.widget.carousel.Carousel.create();
			var slide0 = build.ui.Content
					.create('\
					<h1>BuildJS is Awesome!</h1>\
					<p>Combining class definition and inheritance, module loading, and front-end widgets,\
					BuildJS lets you develop your Single Page Application in style!</p>\
					');
			carousel.carouselSlider.addChild(slide0);
			var slide1 = build.ui.Content.create('\
					<h1>Class Definitions</h1>\
					<p></p>\
					');
			carousel.carouselSlider.addChild(slide1);
			var slide2 = build.ui.Content.create('\
					<h1>Widgeting Framework</h1>\
					<p></p>\
					');
			carousel.carouselSlider.addChild(slide2);

			this.addChild(carousel);
		}
	});
});