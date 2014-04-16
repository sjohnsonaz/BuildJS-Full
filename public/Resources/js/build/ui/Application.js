/**
 * @class build.ui.Application
 * @extends build.ui.Panel
 */
Build('build.ui.Application', [ 'build::build.ui.Panel', 'build::build.history.HashRouter' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Panel',
		/** 
		 * @constructor
		 * @property router
		 * @property marginTop
		 */
		$constructor : function Application() {
			$super(this)();
			this.router = new build.history.HashRouter();
			this.watchStyle('marginTop', 'marginTop', 'px');
		},
		$prototype : {
			/**
			 * @method run
			 */
			run : function(parent) {
				parent = parent || parent.element;
				while (parent.firstChild) {
					parent.removeChild(parent.firstChild);
				}
				parent.appendChild(application.element);
			}
		}
	});
});