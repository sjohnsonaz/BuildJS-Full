/**
 * @class build.widget.user.UserWidget
 * @extends build.ui.SwitcherPanel 
 */
Build('build.widget.user.UserWidget', [ 'build::build.ui.SwitcherPanel', 'build::build.service.UserServiceConnection', 'build::build.widget.user.UserListForm', 'build::build.widget.user.UserViewForm', 'build::build.widget.user.UserCreateForm',
		'build::build.widget.user.UserEditForm', 'build::build.widget.user.UserDeleteForm' ], function(define, $super, helper) {
	define({
		$extends : 'build.ui.SwitcherPanel',
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
				console.log(user);
			});
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