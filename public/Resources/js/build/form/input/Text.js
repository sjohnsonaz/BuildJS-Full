/**
 * @class build.form.input.Text
 * @extends build.form.FormElement
 */
Build('build.form.input.Text', [ 'build::build.form.FormElement' ], function(define, $super) {
	var textTypes = {
		text : 'text',
		password : 'password',
		number : 'number',
		tel : 'tel',
		email : 'email',
		url : 'url'
	};
	define({
		$extends : 'build.form.FormElement',
		/**
		 * @constructor
		 * @param text
		 * @param value
		 */
		/**
		 * @property type
		 * @property value
		 * @property placeholder
		 * @property name
		 */
		$constructor : function Text(text, value, textType) {
			$super(this)(text, value);
			this.watchProperty('value');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
			this.element.addEventListener('change', function() {
				this.value = this.element.value;
			}.bind(this));
			this.watchProperty('textType', 'type', textType || 'text', null, function(value, cancel) {
				return textTypes[value] || cancel;
			});
		},
		$prototype : {
			type : 'input'
		},
		$static : {
			textTypes : textTypes
		}
	});
});