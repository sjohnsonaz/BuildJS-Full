/**
 * @class build.widget.user.UserWidget
 * @extends build.ui.Switcher 
 */
Build('build.widget.user.UserWidget', [ 'build::build.ui.Switcher', 'build::build.service.UserServiceConnection', 'build::build.widget.user.UserListForm', 'build::build.widget.user.UserViewForm', 'build::build.widget.user.UserCreateForm',
		'build::build.widget.user.UserEditForm', 'build::build.widget.user.UserDeleteForm', 'build::build.widget.user.UserPermissionForm' ], function(define, $super) {
	define({
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
			this.lockable = true;
			this.user = null;
			this.userServiceConnection = userServiceConnection || new build.service.UserServiceConnection();
			this.userListForm = build.widget.user.UserListForm.create(this.userServiceConnection);
			this.userListForm.addCallback('createUser', function() {
				this.active = 1;
				this.userCreateForm.model = {};
			}.bind(this));
			this.userListForm.addCallback('viewUser', function(user) {
				console.log(user);
			});
			this.userListForm.addCallback('editUser', function(user) {
				this.user = user;
				this.active = 2;
				this.userEditForm.model = user;
				console.log(user);
			}.bind(this));
			this.userListForm.addCallback('deleteUser', function(user) {
				this.user = user;
				this.active = 3;
				this.userDeleteForm.model = user;
				console.log(user);
			}.bind(this));
			this.userListForm.addCallback('permission', function(user) {
				this.user = user;
				this.active = 4;
				this.userPermissionForm.model = user;
				console.log(user);
			}.bind(this));
			this.addChild(this.userListForm);

			this.userCreateForm = build.widget.user.UserCreateForm.create(this.userServiceConnection);
			this.userCreateForm.addCallback('saveUser', function(user) {
				this.user = null;
				this.userEditForm.model = null;
				this.active = 0;
				this.list();
			}.bind(this));
			this.userCreateForm.addCallback('cancelUser', function(user) {
				this.user = null;
				this.userEditForm.model = null;
				this.active = 0;
				this.list();
			}.bind(this));
			this.addChild(this.userCreateForm);

			this.userEditForm = build.widget.user.UserEditForm.create(this.userServiceConnection);
			this.userEditForm.addCallback('saveUser', function(user) {
				this.user = null;
				this.userEditForm.model = null;
				this.active = 0;
				this.list();
			}.bind(this));
			this.userEditForm.addCallback('cancelUser', function(user) {
				this.user = null;
				this.userEditForm.model = null;
				this.active = 0;
				this.list();
			}.bind(this));
			this.addChild(this.userEditForm);
			this.userDeleteForm = build.widget.user.UserDeleteForm.create(this.userServiceConnection);
			this.userDeleteForm.addCallback('deleteUser', function(user) {
				this.user = null;
				this.userDeleteForm.model = null;
				this.active = 0;
				this.list();
			}.bind(this));
			this.userDeleteForm.addCallback('cancelUser', function(user) {
				this.user = null;
				this.userDeleteForm.model = null;
				this.active = 0;
				this.list();
			}.bind(this));
			this.addChild(this.userDeleteForm);
			this.userPermissionForm = build.widget.user.UserPermissionForm.create(this.userServiceConnection);
			this.userPermissionForm.addCallback('cancelUser', function(user) {
				this.user = null;
				this.userPermissionForm.model = null;
				this.active = 0;
				this.list();
			}.bind(this));
			this.addChild(this.userPermissionForm);
		},
		$prototype : {
			/**
			 * 
			 */
			list : function() {
				this.userServiceConnection.get(undefined, function(data, request) {
					this.userListForm.model = data;
				}.bind(this), function(request) {

				}.bind(this));
			}
		}
	});
});