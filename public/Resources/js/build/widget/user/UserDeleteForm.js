/**
 * @class build.widget.user.UserDeleteForm
 * @extends build.form.Form
 */
Build('build.widget.user.UserDeleteForm', [ 'build::build.form.Form', 'build::build.form.ButtonGroup', 'build::build.form.input.Button', 'build::build.form.Submit', 'build::build.ui.element.Paragraph' ], function(define, $super) {
	define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 */
		$constructor : function UserDeleteForm(userServiceConnection) {
			$super(this)();
			this.method = 'POST';
			this.action = '#';

			this.userServiceConnection = userServiceConnection;

			this.message = build.ui.element.Paragraph.create();
			this.cancel = build.form.input.Button.create('Cancel');
			this.submit = build.form.Submit.create('Delete');
			this.addChild(this.message);
			var buttonGroup = build.form.ButtonGroup.create();
			buttonGroup.addChild(this.cancel);
			buttonGroup.addChild(this.submit);
			this.addChild(buttonGroup);

			this.preventSubmit();
			this.submit.addEvent('click', function(submit, event) {
				event.preventDefault();
				this.deleteUser();
				return false;
			}, false, this);
			this.cancel.addEvent('click', function(cancel, event) {
				event.preventDefault();
				this.cancelUser();
				return false;
			}, false, this);
		},
		$prototype : {
			wrap : function(model) {
				this.message.text = 'Are you sure you want to delete user "' + model.username + '"?';
			},
			unwrap : function(model) {
			},
			clear : function() {
			},
			deleteUser : function(success, error) {
				// Change to PUT if editing, POST if creating.
				this.userServiceConnection.del(this.model._id, function(data, request) {
					console.log(data);
					if (data.error) {
						this.message.text(data.message);
						console.log(data.message);
					} else {
						Build.safe(success)(data, request);
						this.runCallbacks('deleteUser', data);
					}
				}.bind(this), function(request) {
					Build.safe(error)(request);
				}.bind(this));
			},
			cancelUser : function() {
				this.runCallbacks('cancelUser');
			}
		}
	});
});