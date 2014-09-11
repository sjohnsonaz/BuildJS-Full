/**
 * @class build.ui.Content
 * @extends build.ui.Widget
 */
Build('build.ui.Content', [ 'build::build.ui.Widget' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		/**
		 * @property text
		 * @property textHelpers
		 */
		$constructor : function Content(text) {
			$super(this)(text);
			var templateParser = null;
			this.watchProperty('text', 'innerHTML', null, function(value) {
				return templateParser ? templateParser.parse(value, this) : value;
			}.bind(this));
			this.watchValue('textHelpers', false, null, function(value) {
				if (value) {
					templateParser = build.utility.TemplateParser();
				} else {
					templateParser = null;
				}
				this.text = this.text;
				return value;
			}.bind(this));
			this.text = text || '';
		},
		$prototype : {
			/**
			 * @method init
			 * @param text
			 */
			init : function(text) {
				$super().init(this)(text);
			}
		}
	});
});