var build = build || {};
build.utility = build.utility || {};
build.utility.Mask = (function() {
	/**
	 * @class build.utility.Mask
	 */
	function Mask() {

	}
	function createMask(element, pattern) {
		var regexPattern = createRegex(pattern);
		element.value = formatPattern(pattern, element.value.replace(/\W+/g, ""));
		var firstPosition = getFirstPosition(pattern);
		var patternLength = pattern.replace(/\W+/g, "").length;
		var lastValue = element.value;
		var lastPosition = firstPosition;
		function keyDownListener(event) {
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
					var value = formatPattern(pattern, clean.slice(0, startPosition) + clean.slice(endPosition));
					element.value = value;
					lastValue = value;
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
				var value = formatPattern(pattern, clean.slice(0, startPosition) + clean.slice(endPosition));
				element.value = value;
				lastValue = value;
				var startPosition = getPatternPosition(pattern, startPosition);
				element.selectionStart = startPosition;
				element.selectionEnd = startPosition;
				break;
			default:
				lastPosition = element.selectionStart;
				break;
			}
		}
		function inputListener(event) {
			runMask(element.value);
		}
		function runMask(value) {
			var updated = false;
			var selectionStart = element.selectionStart;
			if (selectionStart <= firstPosition) {
				selectionStart = firstPosition + 1;
			}
			var position = getPosition(pattern, selectionStart);
			var valuePosition = getValuePosition(pattern, selectionStart);
			var clean = value.replace(/\W+/g, "");
			if (clean.length <= patternLength) {
				if (valuePosition > clean.length) {
					position = getPatternPosition(pattern, clean.length);
				}
				var output = formatPattern(pattern, clean);
				var match = matchValue(regexPattern, output);
				if (match && match.length) {
					element.value = output;
					if (output != lastValue) {
						element.selectionStart = position;
						element.selectionEnd = position;
					} else {
						element.selectionStart = lastPosition;
						element.selectionEnd = lastPosition;
					}
					lastValue = output;
					updated = true;
				} else {
					element.value = lastValue;
					element.selectionStart = lastPosition;
					element.selectionEnd = lastPosition;
				}
			} else {
				element.value = lastValue;
				element.selectionStart = lastPosition;
				element.selectionEnd = lastPosition;
			}
			return element.value;
		}
		function destroyMask() {
			element.removeEventListener('keydown', keyDownListener);
			element.removeEventListener('input', inputListener);
		}
		element.addEventListener('keydown', keyDownListener);
		element.addEventListener('input', inputListener);
		return {
			element : element,
			runMask : runMask,
			destroyMask : destroyMask
		};
	}

	function createRegex(pattern) {
		return new RegExp(pattern.replace(/([^a-zA-Z0-9 ])|(9)|(a)|(\*)/g, function(match, other, numeric, alpha, alphanumeric) {
			if (other) {
				return '\\' + other;
			}
			if (numeric) {
				return '[0-9 ]';
			}
			if (alpha) {
				return '[a-zA-Z ]';
			}
			if (alphanumeric) {
				return '[0-9a-zA-Z ]';
			}
		}), 'g');
	}

	function matchValue(regex, value) {
		return value.match(regex);
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
	Mask.createMask = createMask;
	return Mask;
})();

if (typeof Build !== 'undefined') {
	Build.register('build.utility.Mask', build.utility.Mask);
}