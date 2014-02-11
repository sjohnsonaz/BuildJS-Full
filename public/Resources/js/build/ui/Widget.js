Build('build.ui.Widget', [ 'build.ui.Module' ], function(define, $super) {
	var idCount = {};
	define({
		$extends : 'build.ui.Module',
		$constructor : function(type) {
			$super(this)();
			this.type = type || 'div';
			this.createElement();
		},
		$prototype : {
			createElement : function() {
				this.element = document.createElement(this.type);
				this.element.id = this.uniqueId();
				this.element.classList.add(this.uniqueClass());
				this.element.controller = this;
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
			},
			appendChild : function(widget) {
				this.element.appendChild(widget.element);
			},
			removeChild : function(widget) {
				this.element.removeChild(widget.element);
			}
		}
	});
});