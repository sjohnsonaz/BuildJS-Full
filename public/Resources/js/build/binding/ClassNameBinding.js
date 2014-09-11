/**
 * @class build.binding.ClassNameBinding
 * @extends build.binding.OneWayBinding
 * 
 * This toggles a class on a Widget.
 * This is unnecessary if a class is managed by watchClass already.
 */
Build('build.binding.ClassNameBinding', [ 'build::build.binding.OneWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function ClassNameBinding(destination, definition) {
			$super(this)(destination, definition);
			if (definition) {
				this.format = definition.format || '{0}';
				//this.onTrue = definition.onTrue;
				//this.onFalse = definition.onFalse;
			}
		},
		$prototype : {
			update : function(subscription, value, reverse) {
				if (this.format) {
					var condition = this.formatString(this.format, this.cache);
					var wrappedCondition = 'if (' + condition + ') {return this.evaluate(true);} else {return this.evaluate(false);}';
					return eval(wrappedCondition);
				}
			},
			evaluate : function(value) {
				if (value !== this.destination.element.classList.contains(className)) {
					if (value) {
						this.destination.element.classList.add(className);
					} else {
						this.destination.element.classList.remove(className);
					}
				}
				return value;
			}
		}
	});
});