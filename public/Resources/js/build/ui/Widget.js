Build('build.ui.Widget', [ 'build.ui.Module' ], function(define, $super) {
	var idCount = {};
	define({
		$extends : 'build.ui.Module',
		$constructor : function() {
			$super(this)();
			this.id = this.uniqueId();
			this.cssClass = this.uniqueClass();
			console.log('build.ui.Widget');
			this.type = 'div';
		},
		$prototype : {
			createElement : function() {
				this.element = document.createElement(this.type);
				this.element.id = this.id;
				this.element.classList.add(this.cssClass);
				this.build();
			},
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