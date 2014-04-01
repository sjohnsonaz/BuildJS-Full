Build('build.ui.element.Element', [ 'build::build.ui.Widget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function Element(text) {
			$super(this)(text);
			var regex;
			var textHelpers = false;
			Object.defineProperty(this, 'textHelpers', {
				get : function() {
					return textHelpers;
				},
				set : function(value) {
					textHelpers = !!value;
					if (textHelpers) {
						regex = new RegExp(/{{([^{}]+)}}/g);
					}
				}
			})
			this.watchProperty('text', 'innerHTML', null, function(value) {
				if (regex) {
					value = typeof value === 'string' ? value.replace(regex, function(match, value, all) {
						var data = value.split(':');
						return '<' + data[0] + ' class="fa fa-' + data[1] + '"></' + data[0] + '>';
					}) : value;
				}
				return value;
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