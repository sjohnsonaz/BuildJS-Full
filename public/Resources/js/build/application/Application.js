/**
 * @class build.application.Application
 * @extends build.ui.Container
 */
Build('build.application.Application', [ 'build::build.ui.Container', 'build::build.history.HashRouter' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Container',
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
				var preloadContainer = null;
				while (parent.firstChild) {
					var removedElmement = parent.removeChild(parent.firstChild);
					if (removedElmement.id == 'build-preload-container') {
						preloadContainer = removedElmement;
					}
				}
				parent.appendChild(application.element);
				if (preloadContainer) {
					parent.appendChild(preloadContainer);
				}
			}
		}
	});
});