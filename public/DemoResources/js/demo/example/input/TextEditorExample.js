/**
 * @class demo.example.input.TextEditorExample
 * @extends build.ui.Container
 */
Build('demo.example.input.TextEditorExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.editor.TextEditor' ], [ 'text-editor' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
		$constructor : function TextEditorExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Text Editor');
			this.addChild(header0);

			var upload = build.widget.editor.TextEditor.create([ [ 'bold', 'italic', 'underline', 'strikeThrough', 'insertUnorderedList', 'insertOrderedList', 'formatBlockH1', 'formatBlockH2', 'formatBlockH3', 'removeFormat' ],
					[ 'createLink', 'insertImage' ] ]);

			this.addChild(upload);
		}
	});
});