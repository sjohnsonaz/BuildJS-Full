Build('build.utility.TemplateParser', [], function(define, $super, helper) {
	define({
		$constructor : function TemplateParser(regex) {
			this.regex = regex || new RegExp(/{{([^{}]+)}}/g);
			this.helpers = {};
			this.helpers['i'] = function(value, text, context) {
				return '<i class="fa fa-' + value + '"></i>';
			};
		},
		$prototype : {
			parse : function(text, context) {
				switch (typeof text) {
				case 'string':
					text = text.replace(this.regex, function(match, value, all) {
						var escape = false;
						if (value[0] == '{' && value[value.length] == '}') {
							escape = true;
							value = value.substring(1, value.length - 2);
						}
						var data = value.split(':');
						if (data.length > 1) {
							var templateHelper = this.helpers[data[0]];
							value = helper.safe(templateHelper)(data[1], text, context);
						} else {
							value = context ? context[value] : value;
						}
						if (escape) {

						}
						return value;
					}.bind(this));
					break;
				case 'object':
				case 'function':
					text = text.toString();
					break;
				}
				return text;
			}
		},
		$singleton : true
	});
});