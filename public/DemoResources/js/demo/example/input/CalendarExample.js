/**
 * @class demo.example.input.CalendarExample
 * @extends build.ui.Container
 */
Build('demo.example.input.CalendarExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.calendar.DateInput' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function CalendarExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Calendar');
			this.addChild(header0);

			var dateInput = build.widget.calendar.DateInput.create();
			dateInput.inline = true;

			this.addChild(dateInput);
		}
	});
});