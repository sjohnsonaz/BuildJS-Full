Build('build.utility.TemplateParser', [], function(define, $super, merge, safe) {
	define({
		$constructor : function TemplateParser() {
			this.regex = new RegExp(/{{([^{}]+)}}/g);
		},
		$prototype : {
			parse : function(value) {
				var regex = this.regex;
				if (regex) {
					value = typeof value === 'string' ? value.replace(regex, function(match, value, all) {
						var data = value.split(':');
						return '<' + data[0] + ' class="fa fa-' + data[1] + '"></' + data[0] + '>';
					}) : value;
				}
				return value;
			}
		}
	});
});