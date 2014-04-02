Build('build.utility.TemplateParser', [], function(define, $super, merge, safe) {
	define({
		$constructor : function TemplateParser() {
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
			});
			this.watchProperty('text', 'innerHTML', null, function(value) {
				if (regex) {
					value = typeof value === 'string' ? value.replace(regex, function(match, value, all) {
						var data = value.split(':');
						return '<' + data[0] + ' class="fa fa-' + data[1] + '"></' + data[0] + '>';
					}) : value;
				}
				return value;
			});
		}
	});
});