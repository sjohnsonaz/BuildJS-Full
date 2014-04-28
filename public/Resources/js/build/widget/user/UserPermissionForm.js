Build('build.widget.user.UserPermissionForm', [ 'build::build.ui.form.Form', 'build::build.ui.form.ButtonGroup', 'build::build.ui.form.Button', 'build::build.ui.form.Submit', 'build::build.ui.element.Paragraph' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function(userServiceConnection) {
			$super(this)();
			this.userServiceConnection = userServiceConnection;

			this.message = build.ui.element.Paragraph.create();
			this.cancel = build.ui.form.Button.create('Cancel');
			this.submit = build.ui.form.Submit.create('Delete');
			this.addChild(this.message);
			var buttonGroup = build.ui.form.ButtonGroup.create();
			buttonGroup.addChild(this.cancel);
			buttonGroup.addChild(this.submit);
			this.addChild(buttonGroup);
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.method = 'POST';
				this.action = '#';

				this.preventSubmit();
				this.submit.addEvent('click', function(submit, event) {
					event.preventDefault();
					this.confirm();
					return false;
				}, false, this);
				this.cancel.addEvent('click', function(cancel, event) {
					event.preventDefault();
					this.cancelUser();
					return false;
				}, false, this);
			},
			cancelUser : function() {
				this.runCallbacks('cancelUser');
			},
			confirm : function() {
				this.runCallbacks('confirm');
			}
		}
	});
});