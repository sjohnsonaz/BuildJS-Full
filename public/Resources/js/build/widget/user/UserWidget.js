/**
 * @class build.widget.user.UserWidget
 * @extends build.ui.Switcher 
 */
Build('build.widget.user.UserWidget', [ 'build::build.ui.Switcher', 'build::build.service.UserServiceConnection', 'build::build.widget.user.UserListForm', 'build::build.widget.user.UserViewForm', 'build::build.widget.user.UserCreateForm',
		'build::build.widget.user.UserEditForm', 'build::build.widget.user.UserDeleteForm', 'build::build.widget.user.UserPermissionForm' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Switcher',
		/**
		 * @constructor
		 * @param userServiceConnection
		 */
		/**
		 * @property user
		 * @property userServiceConnection
		 * @property userListForm
		 * @property userCreateForm
		 * @property userEditForm
		 * @property userViewForm
		 * @property userDeleteForm
		 */
		$constructor : function UserWidget(userServiceConnection) {
			$super(this)();
			var self = this;
			this.lockable = true;
			this.user = null;
			this.userServiceConnection = userServiceConnection || new build.service.UserServiceConnection();
			this.userListForm = build.widget.user.UserListForm.create(this.userServiceConnection);
			this.userListForm.addCallback('createUser', function() {
				self.active = 1;
				self.userCreateForm.model = {};
			});
			this.userListForm.addCallback('viewUser', function(user) {
				console.log(user);
			});
			this.userListForm.addCallback('editUser', function(user) {
				self.user = user;
				self.active = 2;
				self.userEditForm.model = user;
				console.log(user);
			});
			this.userListForm.addCallback('deleteUser', function(user) {
				self.user = user;
				self.active = 3;
				self.userDeleteForm.model = user;
				console.log(user);
			});
			this.userListForm.addCallback('permission', function(user) {
				self.user = user;
				self.active = 4;
				self.userPermissionForm.model = user;
				console.log(user);
			});
			this.addChild(this.userListForm);

			this.userCreateForm = build.widget.user.UserCreateForm.create(this.userServiceConnection);
			this.userCreateForm.addCallback('saveUser', function(user) {
				self.user = null;
				self.userEditForm.model = null;
				self.active = 0;
				self.list();
			});
			this.userCreateForm.addCallback('cancelUser', function(user) {
				self.user = null;
				self.userEditForm.model = null;
				self.active = 0;
				self.list();
			});
			this.addChild(this.userCreateForm);

			this.userEditForm = build.widget.user.UserEditForm.create(this.userServiceConnection);
			this.userEditForm.addCallback('saveUser', function(user) {
				self.user = null;
				self.userEditForm.model = null;
				self.active = 0;
				self.list();
			});
			this.userEditForm.addCallback('cancelUser', function(user) {
				self.user = null;
				self.userEditForm.model = null;
				self.active = 0;
				self.list();
			});
			this.addChild(this.userEditForm);
			this.userDeleteForm = build.widget.user.UserDeleteForm.create(this.userServiceConnection);
			this.userDeleteForm.addCallback('deleteUser', function(user) {
				self.user = null;
				self.userDeleteForm.model = null;
				self.active = 0;
				self.list();
			});
			this.userDeleteForm.addCallback('cancelUser', function(user) {
				self.user = null;
				self.userDeleteForm.model = null;
				self.active = 0;
				self.list();
			});
			this.addChild(this.userDeleteForm);
			this.userPermissionForm = build.widget.user.UserPermissionForm.create(this.userServiceConnection);
			this.userPermissionForm.addCallback('cancelUser', function(user) {
				self.user = null;
				self.userPermissionForm.model = null;
				self.active = 0;
				self.list();
			});
			this.addChild(this.userPermissionForm);
		},
		$prototype : {
			/**
			 * 
			 */
			list : function() {
				var self = this;
				this.userServiceConnection.get(undefined, function(data, request) {
					self.userListForm.userTable.children = data;
				}, function(request) {
				});
			}
		}
	});
});