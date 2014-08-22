/**
 * @class build.binding.IfBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.IfBinding', [ 'build::build.binding.OneWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function BindingHandler(destination, definition) {
			$super(this)(destination, definition);
			if (definition) {
				this.format = definition.format;
			}
		},
		$prototype : {
			update : function(destination, source, value, reverse) {
				
				var index = this.sources.indexOf(source);
				this.cache[index] = value;
				if (this.format) {
					var condition = this.formatString(this.format, this.cache);
					var wrappedCondition = 'if (' + condition + ') {this.evaluate();}';
					eval(wrappedCondition);
				}// else {
					//destination.text = value;
				//}
			},
			evaluate: function() {
				console.log('Condition: ' + true);
			}
		}
	});
});