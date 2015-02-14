/**
 * @class build.form.input.Text
 * @extends build.ui.Container
 */
Build('build.form.input.Text', [ 'build::build.ui.Container', 'build::build.utility.Mask' ], function($define, $super) {
	var textTypes = {
		text : 'text',
		password : 'password',
		number : 'number',
		tel : 'tel',
		email : 'email',
		url : 'url'
	};
	$define({
		$extends : 'build.ui.Container',
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
			var mask = undefined;
			this.watchProperty('value', 'value', undefined, undefined, function(value, cancel) {
				return mask ? mask.runMask(value + '') : value;
			}.bind(this));
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
			// TODO: Add functionality for more active updates.
			// Use the 'input' event.
			// change does not work with masking
			this.element.addEventListener('change', function() {
				this.value = this.element.value;
			}.bind(this));
			this.watchProperty('textType', 'type', textType || 'text', null, function(value, cancel) {
				return textTypes[value] || cancel;
			});
			var maskBlurFunction = undefined;
			this.watchValue('maskValidRequired', false);
			this.watchValue('mask', undefined, undefined, function(value, cancel) {
				if (mask) {
					mask.destroyMask();
				}
				if (value) {
					mask = build.utility.Mask.createMask(this.element, value);
					if (!maskBlurFunction) {
						maskBlurFunction = function() {
							if (this.element.validity.valid) {
								this.value = this.element.value;
							}
						}.bind(this);
						this.element.addEventListener('blur', maskBlurFunction);
					}
				} else {
					if (maskBlurFunction) {
						this.element.removeEventListener('blur', maskBlurFunction);
					}
				}
				return value;
			}.bind(this));
		},
		$prototype : {
			type : 'input',
			validateEmail : function() {
				return !!this.value.match(/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/g);
			}
		},
		$static : {
			textTypes : textTypes
		}
	});
});