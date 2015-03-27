/**
 * @class build.widget.user.UserListForm
 * @extends build.form.Form 
 */
Build('build.widget.user.UserListForm', [ 'build::build.form.Form', 'build::build.container.table.SimpleTable', 'build::build.form.input.Button', 'build::build.form.container.ButtonGroup' ], function($define, $super) {
	$define({
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
			this.userTable = build.container.table.SimpleTable.create();
			this.userTable.map = {
				username : 0,
				firstName : 1,
				lastName : 2
			};
			this.userTable.header.children = [ 'Username', 'First Name', 'Last Name', '' ];
			this.addChild(this.userTable);
			this.userServiceConnection = userServiceConnection;

			this.createButton.addEventListener('click', function(button, event) {
				event.preventDefault();
				this.createUser();
				return false;
			}, false, this);
			//this.userTable = build.widget.grid.Grid.create();
			/*
			this.userTable.template = {
				create : function(child, parent) {
					var self = this;
					var user = child;
					var viewUserButton = build.form.input.Button.create('View');
					var editUserButton = build.form.input.Button.create('Edit');
					var deleteUserButton = build.form.input.Button.create('Delete');
					var permissionButton = build.form.input.Button.create('Permission');
					var buttonGroup = build.form.container.ButtonGroup.create();
					(function(user) {
						viewUserButton.addEventListener('click', function(button, event) {
							event.preventDefault();
							this.viewUser(user);
							return false;
						}, false, self);
						editUserButton.addEventListener('click', function(button, event) {
							event.preventDefault();
							this.editUser(user);
							return false;
						}, false, self);
						deleteUserButton.addEventListener('click', function(button, event) {
							event.preventDefault();
							this.deleteUser(user);
							return false;
						}, false, self);
						permissionButton.addEventListener('click', function(button, event) {
							event.preventDefault();
							this.permission(user);
							return false;
						}, false, self);
					})(user);
					buttonGroup.addChild(viewUserButton);
					buttonGroup.addChild(editUserButton);
					buttonGroup.addChild(deleteUserButton);
					buttonGroup.addChild(permissionButton);
					var row = document.createElement('tr');
					var cell0 = document.createElement('td');
					cell0.appendChild(document.createTextNode(user.username));
					var cell1 = document.createElement('td');
					cell1.appendChild(document.createTextNode(user.firstName));
					var cell2 = document.createElement('td');
					cell2.appendChild(document.createTextNode(user.lastName));
					var cell3 = document.createElement('td');
					cell3.appendChild(buttonGroup.element);
					row.appendChild(cell0);
					row.appendChild(cell1);
					row.appendChild(cell2);
					row.appendChild(cell3);
					return row;
				},
				destroy : function(child, element) {

				}
			};
			*/
		},
		$prototype : {
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