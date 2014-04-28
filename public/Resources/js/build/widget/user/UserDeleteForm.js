/**
 * @class build.widget.user.UserDeleteForm
 * @extends build.ui.form.Form
 */
Build('build.widget.user.UserDeleteForm', [ 'build::build.ui.form.Form', 'build::build.ui.form.ButtonGroup', 'build::build.ui.form.Button', 'build::build.ui.form.Submit', 'build::build.ui.element.Paragraph' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.Form',
		/**
		 * @constructor
		 */
		$constructor : function UserDeleteForm(userServiceConnection) {
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
					this.deleteUser();
					return false;
				}, false, this);
				this.cancel.addEvent('click', function(cancel, event) {
					event.preventDefault();
					this.cancelUser();
					return false;
				}, false, this);
			},
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