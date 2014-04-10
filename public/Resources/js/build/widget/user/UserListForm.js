Build('build.widget.user.UserListForm', [ 'build::build.ui.form.Form', 'build::build.ui.element.Table', 'build::build.ui.form.Button', 'build::build.ui.form.ButtonGroup' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function UserListForm(userServiceConnection) {
			$super(this)();
			this.createButton = build.ui.form.Button.create('create');
			this.createButton.addClass('pull-right');
			this.addChild(this.createButton);
			this.userTable = build.ui.element.Table.create();
			this.userTable.headers.push('Username', 'First Name', 'Last Name', '');
			this.addChild(this.userTable);
			this.userServiceConnection = userServiceConnection;
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.createButton.addEvent('click', function(event) {

				});
			},
			wrap : function(model) {
				this.userTable.children.removeAll();
				for (var index = 0, length = model.length; index < length; index++) {
					var user = model[index];
					var viewUserButton = build.ui.form.Button.create('View');
					var editUserButton = build.ui.form.Button.create('Edit');
					var deleteUserButton = build.ui.form.Button.create('Delete');
					var buttonGroup = build.ui.form.ButtonGroup.create();
					(function(user) {
						viewUserButton.addEvent('click', function(button, event) {
							event.preventDefault();
							this.viewUser(user);
							return false;
						}, false, this);
						editUserButton.addEvent('click', function(button, event) {
							event.preventDefault();
							this.editUser(user);
							return false;
						}, false, this);
						deleteUserButton.addEvent('click', function(button, event) {
							event.preventDefault();
							this.deleteUser(user);
							return false;
						}, false, this);
					}.bind(this))(user);
					buttonGroup.addChild(viewUserButton);
					buttonGroup.addChild(editUserButton);
					buttonGroup.addChild(deleteUserButton);
					this.userTable.children.push([ user.username, user.firstName, user.lastName, buttonGroup ]);
				}
			},
			unwrap : function(model) {
			},
			clear : function() {
				this.userTable.rows.removeAll();
			},
			viewUser : function(user) {
				this.runCallbacks('viewUser', user);
			},
			editUser : function(user) {
				this.runCallbacks('editUser', user);
			},
			deleteUser : function(user) {
				this.runCallbacks('deleteUser', user);
			}
		}
	});
});