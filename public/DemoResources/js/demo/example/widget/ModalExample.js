Build('demo.example.widget.ModalExample', [ 'build::build.ui.Container', 'build::build.ui.element.Header2', 'build::build.ui.element.Paragraph', 'build::build.widget.modal.Modal', 'build::build.ui.Text', 'build::build.ui.form.Button' ], function(
		define, $super) {
	define({
		$extends : 'build.ui.Container',
		$constructor : function ModalExample() {
			$super(this)();
			var header0 = build.ui.element.Header2.create('Modals');
			this.addChild(header0);

			modal = build.widget.modal.Modal.create();

			var button0 = build.ui.form.Button.create('Open Modal');
			var button1 = build.ui.form.Button.create('Close Modal');

			function toggleModal() {
				modal.open = !modal.open;
			}

			button0.addEvent('click', toggleModal);
			button1.addEvent('click', toggleModal);

			this.addChild(button0);
			modal.addChild(button1);
			modal.addChild(build.ui.Text.create('Modal text'));
			this.addChild(modal);
		}
	});
});