/**
 * @class build.utility.DocumentControl
 */
Build('build.utility.DocumentControl', [], function($define, $super) {
	/**
	 * @constructor
	 */
	$define({
		$constructor : function DocumentControl() {
			var self = this;
			this.element = document;
			this.body = document.body;
			this.clickWatches = [];
			this.element.addEventListener('click', function(event) {
				if (event.toElement) {
					for (var index = 0, length = self.clickWatches; index < length; index++) {
						var clickWatch = self.clickWatches[index];
						if (clickWatch !== event.toElement && clickWatch.element !== event.toElement) {
							console.log(event);
						}
					}
				}
			});
		},
		$singleton : true
	});
});