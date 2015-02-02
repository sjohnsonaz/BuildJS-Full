/**
 * @class build.widget.authentication.LoginViewModel
 * @extends build.viewmodel.ViewModel
 */
Build('build.widget.authentication.LoginViewModel', [ 'build::build.viewmodel.ViewModel' ], function(define, $super) {
	define({
		$extends : 'build.viewmodel.ViewModel',
		/**
		 * @constructor
		 */
		$constructor : function LoginViewModel(data) {
			$super(this)({
				username : {},
				password : {},
				message : {}
			}, data);
		}
	});
});