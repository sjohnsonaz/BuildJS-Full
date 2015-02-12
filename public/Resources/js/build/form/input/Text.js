/**
 * @class build.form.input.Text
 * @extends build.ui.Container
 */
Build('build.form.input.Text', [ 'build::build.ui.Container' ], function(define, $super) {
	var textTypes = {
		text : 'text',
		password : 'password',
		number : 'number',
		tel : 'tel',
		email : 'email',
		url : 'url'
	};
	define({
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
			this.watchProperty('value');
			this.watchAttribute('placeholder');
			this.watchAttribute('name');
			// TODO: Add functionality for more active updates.
			// Use the 'input' event.
			this.element.addEventListener('change', function() {
				this.value = this.element.value;
			}.bind(this));
			this.watchProperty('textType', 'type', textType || 'text', null, function(value, cancel) {
				return textTypes[value] || cancel;
			});
		},
		$prototype : {
			type : 'input',
			validateEmail : function() {
				return !!this.value.match(/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/g);
			},
			createMask : function(pattern) {
				createMask(this.element, pattern);
			}
		},
		$static : {
			textTypes : textTypes
		}
	});
	function createMask(element, pattern) {
		element.value = formatPattern(pattern, element.value.replace(/\W+/g, ""));
		element.addEventListener('keydown', function(event) {
			switch (event.keyCode) {
			case 8:
				event.preventDefault();
				event.stopPropagation();
				var startPosition = getValuePosition(pattern, element.selectionStart);
				var endPosition = getValuePosition(pattern, element.selectionEnd);
				if (endPosition > 0) {
					var clean = element.value.replace(/\W+/g, "");
					startPosition = Math.min(startPosition, clean.length);
					endPosition = Math.min(endPosition, clean.length);
					if (endPosition == startPosition) {
						startPosition--;
					}
					element.value = formatPattern(pattern, clean.slice(0, startPosition) + clean.slice(endPosition));
				}
				var startPosition = getPatternPosition(pattern, startPosition);
				element.selectionStart = startPosition;
				element.selectionEnd = startPosition;
				break;
			case 46:
				event.preventDefault();
				event.stopPropagation();
				var startPosition = getValuePosition(pattern, element.selectionStart);
				var endPosition = getValuePosition(pattern, element.selectionEnd);
				var clean = element.value.replace(/\W+/g, "");
				startPosition = Math.min(startPosition, clean.length);
				endPosition = Math.min(endPosition, clean.length);
				if (endPosition == startPosition) {
					endPosition++;
				}
				element.value = formatPattern(pattern, clean.slice(0, startPosition) + clean.slice(endPosition));
				var startPosition = getPatternPosition(pattern, startPosition);
				element.selectionStart = startPosition;
				element.selectionEnd = startPosition;
				break;
			}
		});
		var firstPosition = getFirstPosition(pattern);
		element.addEventListener('input', function(event) {
			var selectionStart = element.selectionStart;
			if (selectionStart <= firstPosition) {
				selectionStart = firstPosition + 1;
			}
			var position = getPosition(pattern, selectionStart);
			var valuePosition = getValuePosition(pattern, selectionStart);
			var clean = element.value.replace(/\W+/g, "");
			if (valuePosition > clean.length) {
				position = getPatternPosition(pattern, clean.length);
			}
			element.value = formatPattern(pattern, clean);
			element.selectionStart = position;
			element.selectionEnd = position;
		});
	}

	function formatPattern(pattern, value) {
		var output = '';
		var valueIndex = 0;
		for (var index = 0, length = pattern.length; index < length; index++) {
			var character = pattern[index];
			if (character == '9' || character == 'a') {
				output += value[valueIndex] || ' ';
				valueIndex++;
			} else {
				output += character;
			}
		}
		return output;
	}
	
	function getFirstPosition(pattern) {
		for (var index = 0, length = pattern.length; index < length; index++) {
			var character = pattern[index];
			if (character == '9' || character == 'a') {
				break;
			}
		}
		return index;

	}

	function getValuePosition(pattern, position) {
		position = Math.min(position, pattern.length);
		var valuePosition = 0;
		for (var index = 0; index < position; index++) {
			var character = pattern[index];
			if (character == '9' || character == 'a') {
				valuePosition++;
			}
		}
		return valuePosition;
	}

	function getPatternPosition(pattern, position) {
		var valueIndex = 0;
		for (var index = 0, length = pattern.length; index < length; index++) {
			var character = pattern[index];
			if (character == '9' || character == 'a') {
				valueIndex++;
				if (valueIndex > position) {
					break;
				}
			}
		}
		return index;
	}

	function getPosition(pattern, position) {
		for (var length = pattern.length; position < length; position++) {
			var character = pattern[position];
			if (character == '9' || character == 'a') {
				break;
			}
		}
		return position;
	}
});