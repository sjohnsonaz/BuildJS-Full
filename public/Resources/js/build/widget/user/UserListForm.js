Build('build.widget.user.UserListForm', [ 'build::build.ui.form.Form', 'build::build.ui.form.Table' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function(userServiceConnection) {
			$super(this)();
			this.userTable = build.ui.form.Table.create();
			this.userTable.headers([ 'Username', 'First Name', 'Last Name' ]);
			this.addChild(this.userTable);
			this.userServiceConnection = userServiceConnection;
			this.userServiceConnection.get(undefined, function(data, request) {
				this.model(data);
			}.bind(this), function(request) {

			}.bind(this));
		},
		$prototype : {
			wrap : function(model) {
				this.userTable.rows.removeAll();
				for (var index = 0, length = model.length; index < length; index++) {
					var user = model[index];
					this.userTable.rows.push([ user.username, user.firstName, user.lastName ]);
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