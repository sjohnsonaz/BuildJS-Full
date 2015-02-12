/**
 * @class build.history.HistoryRouter
 * @extends build.Module
 */
Build('build.history.HistoryRouter', [ 'build::build.Module' ], function(define, $super) {
	define({
		$extends : 'build.Module',
		/**
		 * @constructor
		 */
		$constructor : function HistoryRouter() {
			$super(this)();
		},
		$prototype : {}
	});
});