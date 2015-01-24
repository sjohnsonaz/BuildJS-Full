Build('build.widget.user.UserPermissionForm', [ 'build::build.form.Form', 'build::build.form.ButtonGroup', 'build::build.form.Button', 'build::build.form.Submit', 'build::build.ui.element.Paragraph' ], function(define, $super) {
	define({
		$extends : 'build.form.Form',
		$constructor : function(userServiceConnection) {
			$super(this)();
			this.method = 'POST';
			this.action = '#';

			this.userServiceConnection = userServiceConnection;

			this.message = build.ui.element.Paragraph.create();
			this.cancel = build.form.Button.create('Cancel');
			this.submit = build.form.Submit.create('Delete');
			this.addChild(this.message);
			var buttonGroup = build.form.ButtonGroup.create();
			buttonGroup.addChild(this.cancel);
			buttonGroup.addChild(this.submit);
			this.addChild(buttonGroup);

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
		$prototype : {
			cancelUser : function() {
				this.runCallbacks('cancelUser');
			},
			confirm : function() {
				this.runCallbacks('confirm');
			}
		}
	});
});