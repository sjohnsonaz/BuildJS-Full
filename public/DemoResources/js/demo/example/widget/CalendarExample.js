/**
 * @class demo.example.widget.CalendarExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.CalendarExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.calendar.Calendar' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function CalendarExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Calendar');
			this.addChild(header0);

			calendar = build.widget.calendar.Calendar.create();

			this.addChild(calendar);
		}
	});
});