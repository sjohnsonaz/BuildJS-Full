Build('build.ui.Widget', [ 'build.ui.Module' ], function(define) {
	var idCount = {};
	define({
		$extends : 'build.ui.Module',
		$constructor : function() {
			this.$super();
			this.id = this.uniqueId();
			this.cssClass = this.uniqueClass();
			console.log('build.ui.Widget');
			this.element = document.createElement('div');
			this.element.id = this.id;
			this.element.classList.add(this.cssClass);
		},
		$prototype : {
			build : function() {
			},
			uniqueId : function() {
				var $name = this.constructor.$name;
				idCount[$name] = idCount[$name] ? idCount[$name] + 1 : 0;
				return Build.nameToCss($name + '-' + idCount[$name]);
			},
			uniqueClass : function() {
				return Build.nameToCss(this.constructor.$name);
			}
		}
	});
});