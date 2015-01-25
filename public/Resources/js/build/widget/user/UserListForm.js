/**
 * @class build.widget.user.UserListForm
 * @extends build.form.Form 
 */
Build('build.widget.user.UserListForm', [ 'build::build.form.Form', 'build::build.widget.grid.Grid', 'build::build.form.input.Button', 'build::build.form.container.ButtonGroup' ], function(define, $super) {
	define({
		$extends : 'build.form.Form',
		/**
		 * @constructor
		 * @param userServiceConnection
		 */
		/**
		 * @property userServiceConnection
		 * @property createButton
		 * @property userTable
		 */
		$constructor : function UserListForm(userServiceConnection) {
			$super(this)();
			this.createButton = build.form.input.Button.create('New User');
			this.createButton.addClass('pull-right');
			this.addChild(this.createButton);
			this.userTable = build.widget.grid.Grid.create();
			this.userTable.addHeader('Username', 'First Name', 'Last Name', '');
			this.addChild(this.userTable);
			this.userServiceConnection = userServiceConnection;

			this.createButton.addEvent('click', function(button, event) {
				event.preventDefault();
				this.createUser();
				return false;
			}, false, this);
		},
		$prototype : {
			/**
			 * 
			 */
			wrap : function(model) {
				this.userTable.removeAll();
				for (var index = 0, length = model.length; index < length; index++) {
					var user = model[index];
					var viewUserButton = build.form.input.Button.create('View');
					var editUserButton = build.form.input.Button.create('Edit');
					var deleteUserButton = build.form.input.Button.create('Delete');
					var permissionButton = build.form.input.Button.create('Permission');
					var buttonGroup = build.form.container.ButtonGroup.create();
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
						permissionButton.addEvent('click', function(button, event) {
							event.preventDefault();
							this.permission(user);
							return false;
						}, false, this);
					}.bind(this))(user);
					buttonGroup.addChild(viewUserButton);
					buttonGroup.addChild(editUserButton);
					buttonGroup.addChild(deleteUserButton);
					buttonGroup.addChild(permissionButton);
					this.userTable.addRow([ user.username, user.firstName, user.lastName, buttonGroup ]);
				}
			},
			/**
			 * 
			 */
			unwrap : function(model) {
			},
			/**
			 * 
			 */
			clear : function() {
				this.userTable.removeAll();
			},
			/**
			 * 
			 */
			createUser : function() {
				this.runCallbacks('createUser');
			},
			/**
			 * 
			 */
			viewUser : function(user) {
				this.runCallbacks('viewUser', user);
			},
			/**
			 * 
			 */
			editUser : function(user) {
				this.runCallbacks('editUser', user);
			},
			/**
			 * 
			 */
			deleteUser : function(user) {
				this.runCallbacks('deleteUser', user);
			},
			permission : function(user) {
				this.runCallbacks('permission', user);
			}
		}
	});
});