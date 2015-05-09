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
			var self = this;
			var mask = undefined;
			var internalUpdate = false;
			this.watchProperty('value', 'value', undefined, undefined, function(value, current, cancel) {
				return internalUpdate ? value : (mask ? mask.runMask(value ? value + '' : '') : value);
			});
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
			// TODO: Add functionality for more active updates.
			// Use the 'input' event.
			// change does not work with masking
			this.element.addEventListener('change', function() {
				internalUpdate = true;
				self.value = self.element.value;
				internalUpdate = false;
			});
			this.watchProperty('textType', 'type', textType || 'text', null, function(value, current, cancel) {
				return textTypes[value] || cancel;
			});
			var maskBlurFunction = undefined;
			this.watchValue('maskValidRequired', false);
			this.watchValue('mask', undefined, undefined, function(value, current, cancel) {
				if (mask) {
					mask.destroyMask();
				}
				if (value) {
					mask = build.utility.Mask.createMask(self.element, value);
				}
				return value;
			});
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