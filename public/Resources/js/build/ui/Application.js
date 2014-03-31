Build('build.ui.Application', [ 'build::build.ui.Panel', 'build::build.history.HashRouter' ], function(define, $super) {
	define({
		$extends : 'build.ui.Panel',
		$constructor : function Application() {
			$super(this)();
			this.router = new build.history.HashRouter();
		},
		$prototype : {
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