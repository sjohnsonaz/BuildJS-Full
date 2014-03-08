Build('build.ui.authentication.LoginForm', [ 'build.ui.form.Form', 'build.ui.form.Text', 'build.ui.form.Password', 'build.ui.form.Submit', 'build.ui.form.FormControl', 'build.ui.form.Label' ], function(define, $super, merge) {
	define({
		$extends : 'build.ui.form.Form',
		$constructor : function() {
			$super(this)();
			this.method('POST');
			this.action('#');
			this.username = build.ui.form.Text.create();
			this.username.placeholder('Username');
			this.password = build.ui.form.Password.create();
			this.password.placeholder('Password');
			this.submit = build.ui.form.Submit.create('Login');

			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Username'), this.username));
			this.addChild(build.ui.form.FormControl.create(build.ui.form.Label.create('Password'), this.password));
			this.addChild(this.submit);
		}
	});
});