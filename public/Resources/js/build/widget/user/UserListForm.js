Build('build.widget.user.UserListForm', [ 'build::build.ui.form.Form', 'build::build.ui.form.Table', 'build::build.ui.form.Button', 'build::build.ui.form.ButtonGroup' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function(userServiceConnection) {
			$super(this)();
			this.userTable = build.ui.form.Table.create();
			this.userTable.headers([ 'Username', 'First Name', 'Last Name', '' ]);
			this.addChild(this.userTable);
			this.userServiceConnection = userServiceConnection;
		},
		$prototype : {
			wrap : function(model) {
				this.userTable.rows.removeAll();
				for (var index = 0, length = model.length; index < length; index++) {
					var user = model[index];
					var viewUserButton = build.ui.form.Button.create('View');
					var editUserButton = build.ui.form.Button.create('Edit');
					var deleteUserButton = build.ui.form.Button.create('Delete');
					var buttonGroup = build.ui.form.ButtonGroup.create();
					buttonGroup.addChild(viewUserButton);
					buttonGroup.addChild(editUserButton);
					buttonGroup.addChild(deleteUserButton);
					this.userTable.rows.push([ user.username, user.firstName, user.lastName, buttonGroup ]);
				}
			},
			unwrap : function(model) {
			},
			clear : function() {
				this.userTable.rows.removeAll();
			}
		}
	});
});