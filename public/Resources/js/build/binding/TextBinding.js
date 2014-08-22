/**
 * @class build.binding.TextBinding
 * @extends build.binding.OneWayBinding
 */
Build('build.binding.TextBinding', [ 'build::build.binding.OneWayBinding' ], function(define, $super) {
	define({
		$extends : 'build.binding.OneWayBinding',
		/**
		 * @constructor
		 */
		$constructor : function TextBinding(destination, definition) {
			$super(this)(destination, definition);
			if (definition) {
				this.format = definition.format;
			}
		},
		$prototype : {
			init : function(destination, source) {
			},
			update : function(destination, source, value, reverse) {
				var index = this.sources.indexOf(source);
				this.cache[index] = value;
				if (this.format) {
					destination.text = this.stringFormat(this.format, this.cache);
				} else {
					destination.text = value;
				}
			}
		}
	});
});