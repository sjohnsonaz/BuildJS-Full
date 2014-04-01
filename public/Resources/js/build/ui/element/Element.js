Build('build.ui.element.Element', [ 'build::build.ui.Widget' ], function(define, $super, merge, safe) {
	define({
		$extends : 'build.ui.Widget',
		$constructor : function Element(text) {
			$super(this)(text);
			var regex = new RegExp(/{{([^{}]+)}}/g);
			this.watchProperty('text', 'innerHTML', null, function(value) {
				value = typeof value === 'string' ? value.replace(regex, function(match, value, all) {
					var data = value.split(':');
					return '<' + data[0] + ' class="fa fa-' + data[1] + '"></' + data[0] + '>';
				}) : value;
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