/**
 * @class demo.example.widget.CodeExample
 * @extends build.ui.Container
 */
Build('demo.example.widget.CodeExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.code.Code' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		$constructor : function CodeExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Code');
			this.addChild(header0);

			codeText = "window.onload = function() {\n\tconsole.log('test');\n};";
			var code = build.widget.code.Code.create(codeText);

			this.addChild(code);
		}
	});
});