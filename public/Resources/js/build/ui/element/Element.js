Build('build.ui.element.Element', [ 'build::build.ui.Widget', 'build::build.utility.TemplateParser' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function Element(text) {
			$super(this)(text);
			var templateParser = null;
			var textHelpers = false;
			Object.defineProperty(this, 'textHelpers', {
				get : function() {
					return textHelpers;
				},
				set : function(value) {
					textHelpers = !!value;
					if (textHelpers) {
						templateParser = build.utility.TemplateParser();
						regex = new RegExp(/{{([^{}]+)}}/g);
					}
				}
			});
			this.watchProperty('text', 'innerHTML', null, function(value) {
				return templateParser ? templateParser.parse(value) : value;
			});
		},
		$prototype : {
			init : function(text) {
				$super().init(this)(text);
				this.text = text || '';
			}
		}
	});
});