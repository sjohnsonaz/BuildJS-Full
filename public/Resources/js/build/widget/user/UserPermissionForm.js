/**
 * @class build.widget.user.UserPermissionForm
 * @extends build.form.Form
 */
Build('build.widget.user.UserPermissionForm', [ 'build::build.form.Form', 'build::build.form.container.ButtonGroup', 'build::build.form.input.Button', 'build::build.form.input.Submit', 'build::build.ui.element.Paragraph' ], function($define, $super) {
	$define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 */
		$constructor : function UserPermissionForm(userServiceConnection) {
			$super(this)();
			this.method = 'POST';
			this.action = '#';

			this.userServiceConnection = userServiceConnection;

			this.message = build.ui.element.Paragraph.create();
			this.cancel = build.form.input.Button.create('Cancel');
			this.submit = build.form.input.Submit.create('Delete');
			this.addChild(this.message);
			var buttonGroup = build.form.container.ButtonGroup.create();
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