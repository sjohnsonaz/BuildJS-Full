/**
 * @class build.ui.element.Element
 * @extends build.ui.Widget
 */
Build('build.ui.element.Element', [ 'build::build.ui.Widget', 'build::build.utility.TemplateParser' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		/**
		 * @property textHelpers
		 */
		$constructor : function Element(text) {
			$super(this)(text);
			this.watchValue('textHelpers', false);
		},
		$prototype : {
			/**
			 * @method init
			 * @param text
			 */
			init : function(text) {
				$super().init(this)(text);
				var templateParser = null;
				this.watchProperty('text', 'innerHTML', null, function(value) {
					return templateParser ? templateParser.parse(value, this) : value;
				}.bind(this));
				this.subscribe('textHelpers', function(value) {
					if (value) {
						templateParser = build.utility.TemplateParser();
					} else {
						templateParser = null;
					}
				});
				this.text = text || '';
			}
		}
	});
});