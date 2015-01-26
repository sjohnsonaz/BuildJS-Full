/**
 * @class build.history.HistoryRouter
 * @extends build.ui.Module
 */
Build('build.history.HistoryRouter', [ 'build::build.ui.Module' ], function(define, $super) {
	define({
		$extends : 'build.ui.Module',
		/**
		 * @constructor
		 */
		$constructor : function HistoryRouter() {
			$super(this)();
		},
		$prototype : {}
	});
});