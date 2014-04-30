Build('build.ui.form.Select', [ 'build::build.ui.form.FormElement' ], function(define, $super) {
	define({
		$extends : 'build.ui.form.FormElement',
		$constructor : function() {
			$super(this)();
			this.type = 'select';
			this.options = [];
			this.watchProperty('value');
		},
		$prototype : {
			addOption : function(value, text, selected) {
				var option = document.createElement('option');
				option.value = value;
				option.innerHTML = text;
				option.selected = !!selected;
				this.element.appendChild(option);
			},
			removeOption : function(value) {
				var children = this.element.childNodes;
				var match = null;
				for (var index = 0, length = children.length; index < length; index++) {
					var child = children[index];
					if (child.value == value) {
						match = child;
						break;
					}
				}
				if (match) {
					this.element.removeChild(match);
				}
			},
			clearOptions : function() {
				if (this.element) {
					var element = this.element;
					while (element.firstChild) {
						element.removeChild(element.firstChild);
					}
				}
			}
		}
	});
});