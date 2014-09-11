Build('build.ui.form.Select', [ 'build::build.ui.Container', 'build::build.ui.form.Option' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
		$constructor : function Select() {
			$super(this)();
			this.directAppend = true;
			Object.defineProperty(this, 'value', {
				get : function() {
					if (this.element) {
						if (this.multiple) {
							var options = this.element.options;
							var values = [];
							for (var index = 0, length = options.length; index < length; index++) {
								var option = options[index];
								if (option.selected) {
									values.push(option.value);
								}
							}
							return values;
						} else {
							return this.element.value;
						}
					}
				},
				set : function(value) {
					if (this.element) {
						if (this.multiple) {
							if (typeof value === 'string') {
								value = [ value ];
							}
							var options = this.element.options;
							for (var index = 0, length = options.length; index < length; index++) {
								var option = options[index];
								var valueIndex = value.indexOf(option.value);
								option.selected = valueIndex != -1;
							}
						} else {
							this.element.value = value;
						}
						this.publish('value');
					}
				}
			});
			this.watchProperty('size');
			this.watchProperty('multiple');
		},
		$prototype : {
			type : 'select',
			init : function() {
				$super().init(this)();
				this.element.addEventListener('change', function() {
					this.publish('value');
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