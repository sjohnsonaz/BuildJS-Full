Build('build.ui.form.Select', [ 'build::build.ui.Container', 'build::build.ui.form.Option' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		$constructor : function Select() {
			$super(this)();
			this.type = 'select';
			this.directAppend = true;
			this.watchProperty('value');
			this.watchProperty('size');
			this.watchProperty('multiple');
		},
		$prototype : {
			init : function() {
				$super().init(this)();
				this.element.addEventListener('change', function() {
					this.value = this.element.value;
				}.bind(this));
			},
			addOption : function(value, text, selected) {
				var option = build.ui.form.Option.create(text);
				option.value = value;
				option.selected = !!selected;
				this.addChild(option);
			},
			removeOption : function(value) {
				var children = this.children;
				var match = null;
				for (var index = 0, length = children.length; index < length; index++) {
					var child = children[index];
					if (child.value == value) {
						match = child;
						break;
					}
				}
				if (match) {
					this.removeChild(match);
				}
			}
		}
	});
});