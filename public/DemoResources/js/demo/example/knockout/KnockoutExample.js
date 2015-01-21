/**
 * @class demo.example.knockout.KnockoutExample
 * @extends build.ui.template.KnockoutWidget
 */
Build('demo.example.knockout.KnockoutExample', [ 'build::build.ui.template.KnockoutWidget' ], function(define, $super) {
	define({
		$extends : 'build.ui.template.KnockoutWidget',
		/**
		 * @constructor
		 */
		$constructor : function KnockoutExample() {
			$super(this)();
			this.template = true;
		}
	});
});