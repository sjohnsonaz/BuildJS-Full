/**
 * @class build.binding.ClassNameBinding
 * @extends build.binding.OneWayBinding
 * 
 * This toggles a class on a Widget.
 * This is unnecessary if a class is managed by watchClass already.
 */
Build('build.binding.ClassNameBinding', [ 'build::build.binding.OneWayBinding' ], function($define, $super) {
	$define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function ClassNameBinding(definition) {
			$super(this)(definition);
			if (definition) {
				this.format = definition.format || '{0}';
				this.className = definition.className;
			}
		},
		$prototype : {
			update : function(subscription, value, reverse) {
				if (this.format) {
					switch (typeof this.format) {
					case 'function':
						this.format() ? this.evaluate(true) : this.evaluate(false);
						break;
					case 'string':
						var condition = this.formatString(this.format, this.cache);
						var conditionFunction = new Function('return !!' + condition + ';');
						if (conditionFunction()) {
							this.evaluate(true);
						} else {
							this.evaluate(false);
						}
						break;
					}
				}
			},
			evaluate : function(value) {
				if (value !== this.destination.element.classList.contains(this.className)) {
					if (value) {
						this.destination.element.classList.add(this.className);
					} else {
						this.destination.element.classList.remove(this.className);
					}
				}
			}
		},
		$post : function() {
			build.Module.handlers['className'] = this;
		}
	});
});