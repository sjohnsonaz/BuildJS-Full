Build('build.widget.user.UserWidget', [ 'build::build.ui.SwitcherPanel', 'build::build.service.UserServiceConnection', 'build::build.widget.user.UserListForm', 'build::build.widget.user.UserViewForm', 'build::build.widget.user.UserCreateForm',
		'build::build.widget.user.UserEditForm', 'build::build.widget.user.UserDeleteForm' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.SwitcherPanel',
		$constructor : function(userServiceConnection) {
			$super(this)();
			this.userServiceConnection = userServiceConnection || new build.service.UserServiceConnection();
			this.userListForm = build.widget.user.UserListForm.create(this.userServiceConnection);
			this.addChild(this.userListForm);
		},
		$prototype : {
			list : function() {
				this.userServiceConnection.get(undefined, function(data, request) {
					this.userListForm.model(data);
				}.bind(this), function(request) {

				}.bind(this));
			}
		}
	});
});