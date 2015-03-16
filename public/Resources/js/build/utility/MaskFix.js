var build = build || {};
build.utility = build.utility || {};
build.utility.Mask = (function() {
	/**
	 * @class build.utility.Mask
	 */
	function Mask() {

	}
	function createMask(element, pattern) {
		var regexPattern = createRegexWithWhitespace(pattern);
		element.value = formatPattern(pattern, element.value.replace(/\W+/g, ""));
		element.pattern = createRegexText(pattern);
		var patternLength = pattern.replace(/\W+/g, "").length;
		var lastValue = element.value;
		var firstPosition = getPatternPosition(pattern, 0);
		var lastPosition = firstPosition;
		updateElement(pattern, element);
		function keyDownListener(event) {
			switch (event.keyCode) {
			case 8:
				if (element.selectionStart == element.selectionEnd) {
					event.preventDefault();
					event.stopPropagation();
					var endPosition = getValuePosition(pattern, element.selectionEnd);
					if (endPosition > 0) {
						var clean = element.value.replace(/\W+/g, "");
						endPosition = Math.min(endPosition, clean.length);
						var value = formatPattern(pattern, clean.slice(0, endPosition) + clean.slice(endPosition - 1));
						element.value = value;
						lastValue = value;
					}
					var startPosition = getPatternPosition(pattern, startPosition);
					element.selectionStart = startPosition;
					element.selectionEnd = startPosition;
				}
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
			updateValue(pattern, element);
			/*
			var updated = false;
			var selectionStart = element.selectionStart;
			if (selectionStart <= firstPosition) {
				selectionStart = firstPosition + 1;
			}
			var position = getPositionByValue(value, selectionStart);
			var valuePosition = getValuePosition(pattern, selectionStart);
			var clean = value.replace(/\W+/g, "");
			if (clean.length <= patternLength) {
				if (valuePosition > clean.length) {
					position = getPatternPosition(pattern, clean.length);
				}
				var output = formatPattern(pattern, clean);
				var match = output.match(regexPattern);
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
			*/
			return element.value;
		}
		function focusListener() {
			var selectionEnd = element.selectionEnd;
			if (selectionEnd <= firstPosition) {
				selectionEnd = firstPosition + 1;
			}
			var valuePosition = getValuePosition(pattern, selectionEnd);
			var clean = element.value.replace(/\W+/g, "");
			var position;
			if (valuePosition > clean.length) {
				position = getPatternPosition(pattern, clean.length);
			} else {
				position = getPosition(pattern, selectionEnd);
			}
			if (element.selectionStart > position) {
				element.selectionStart = position;
			} else {
				if (element.selectionStart == element.selectionEnd) {
					element.selectionStart = position;
				}
			}
			element.selectionEnd = position;
		}
		function dispatchChange() {
			// TODO: Not supported in IE9.
			var validity = element.validity
			if ((!validity)) {
				var pattern = new RegExp(element.pattern, 'g');
				if (element.value.match(pattern)) {
					element.dispatchEvent(new CustomEvent('change', {}));
				}
			} else if (validity.valid) {
				element.dispatchEvent(new CustomEvent('change', {}));
			}
		}
		function blurListener() {
			dispatchChange();
		}

		function destroyMask() {
			element.removeEventListener('keydown', keyDownListener);
			element.removeEventListener('input', inputListener);
			//element.removeEventListener('focus', focusListener);
			//element.removeEventListener('blur', blurListener);
		}
		element.addEventListener('keydown', keyDownListener);
		element.addEventListener('input', inputListener);
		//element.addEventListener('focus', focusListener);
		//element.addEventListener('blur', blurListener);
		return {
			element : element,
			runMask : runMask,
			destroyMask : destroyMask
		};
	}

	function createRegexWithWhitespace(pattern) {
		return new RegExp(pattern.replace(/([^a-zA-Z0-9 ])|(9)|(a)|(n)|(0)/g, function(match, other, numeric, alpha, alphanumeric, hexadecimal) {
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
			if (hexadecimal) {
				return '[0-9a-fA-F ]';
			}
		}), 'g');
	}

	function createRegexText(pattern) {
		return pattern.replace(/([^a-zA-Z0-9 ])|(9)|(a)|(n)|(0)/g, function(match, other, numeric, alpha, alphanumeric, hexadecimal) {
			if (other) {
				return '\\' + other;
			}
			if (numeric) {
				return '[0-9]';
			}
			if (alpha) {
				return '[a-zA-Z]';
			}
			if (alphanumeric) {
				return '[0-9a-zA-Z]';
			}
			if (hexadecimal) {
				return '[0-9a-fA-F]';
			}
		});
	}

	function updateElement(pattern, element) {
		var output = updateValue(pattern, element.value, element.selectionStart, element.selectionEnd);
		if (output) {
			element.value = output.value;
			element.selectionStart = output.start;
			element.selectionEnd = output.end;
		} else {
			element.value = lastValue;
			element.selectionStart = lastPosition;
			element.selectionEnd = lastPosition;
		}
	}

	function updateValue(pattern, value, start, end) {
		var output = matchPattern(pattern, value);
		if (output) {
			var adjustedStart = getAdjustedPosition(pattern, value, start);
			var adjustedEnd = getAdjustedPosition(pattern, value, end);
			return {
				value : output,
				start : start,
				end : end
			};
		}
	}

	function matchPattern(pattern, value) {
		var clean = value.replace(/\W+/g, "");
		if (clean.length <= patternLength) {
			var output = formatPattern(pattern, clean);
			var match = output.match(regexPattern);
			if (match && match.length) {
				return output;
			}
		}
	}

	function getAdjustedPosition(pattern, value, position) {
		var valuePosition = value.substring(0, position).replace(/\W+/g, "").length;
		return getPatternPosition(pattern, valuePosition);
	}

	function getPatternPosition(pattern, position) {
		var valueIndex = 0;
		for (var index = 0, length = pattern.length; index < length; index++) {
			var character = pattern[index];
			if (character == '9' || character == 'a' || character == 'n' || character == '0') {
				valueIndex++;
				if (valueIndex > position) {
					break;
				}
			}
		}
		return index;
	}

	function formatPattern(pattern, value) {
		var output = '';
		value = value.replace(/\W+/g, "");
		var valueIndex = 0;
		for (var index = 0, length = pattern.length; index < length; index++) {
			var character = pattern[index];
			if (character == '9' || character == 'a' || character == 'n' || character == '0') {
				output += value[valueIndex] || ' ';
				valueIndex++;
			} else {
				output += character;
			}
		}
		return output;
	}

	Mask.createMask = createMask;
	return Mask;
})();

if (typeof Build !== 'undefined') {
	Build.register('build.utility.Mask', build.utility.Mask);
}