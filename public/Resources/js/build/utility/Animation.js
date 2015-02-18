var build = build || {};
build.utility = build.utility || {};
build.utility.Animation = (function() {
	function Animation() {
	}

	var boundary = [ 'top', 'right', 'bottom', 'left' ];
	var dimension = [ 'height', 'width' ];
	function isBoundary(property) {
		return boundary.indexOf(property) != -1;
	}
	function isDimension(property) {
		return dimension.indexOf(property) != -1
	}

	function animateSingle(element, property, value, time, callback, computedStyle) {
		element.animation = element.animation || {};
		element.animation[property] = element.animation[property] || {};
		var animation = element.animation[property];
		if (animation.timeout) {
			window.clearTimeout(animation.timeout);
			animation.timeout = undefined;
			computedStyle = computedStyle || window.getComputedStyle(element);
			element.style[property] = computedStyle[property];
		}
		var currentAuto = isNaN(parseFloat(element.style[property]))
		var valueAuto = isNaN(parseFloat(value));

		if (currentAuto) {
			if (valueAuto) {
				// auto to auto
				// No conversion
				element.style[property] = value;
				animation.timeout = window.setTimeout(function() {
					window.clearTimeout(animation.timeout);
					animation.timeout = undefined;
					if (typeof callback === 'function') {
						callback();
					}
				}, time);
			} else {
				// auto to value
				if (isBoundary(property)) {
					startValue = 0;
				} else if (isDimension(property)) {
					startValue = element.getBoundingClientRect()[property] + 'px';
				} else {
					startValue = '';
				}
				element.style[property] = startValue;
				animation.timeout = window.setTimeout(function() {
					element.style[property] = value;
					animation.timeout = window.setTimeout(function() {
						window.clearTimeout(animation.timeout);
						animation.timeout = undefined;
						if (typeof callback === 'function') {
							callback();
						}
					}, time);
				}, 100);
			}
		} else {
			if (valueAuto) {
				// value to auto
				var tempValue = element.style[property];
				element.style[property] = 'auto';
				if (isBoundary(property)) {
					interimvalue = 0;
				} else if (isDimension(property)) {
					interimvalue = element.getBoundingClientRect()[property] + 'px';
				} else {
					interimvalue = '';
				}
				element.style[property] = tempValue;
				animation.timeout = window.setTimeout(function() {
					element.style[property] = interimvalue;
					animation.timeout = window.setTimeout(function() {
						element.style[property] = value;
						window.clearTimeout(animation.timeout);
						animation.timeout = undefined;
						if (typeof callback === 'function') {
							callback();
						}
					}, time);
				}, 100);
			} else {
				// value to value
				element.style[property] = value;
				animation.timeout = window.setTimeout(function() {
					window.clearTimeout(animation.timeout);
					animation.timeout = undefined;
					if (typeof callback === 'function') {
						callback();
					}
				}, time);
			}
		}
	}

	function animate(element, values, time, callback) {
		element.animation = element.animation || {};
		time = time || 500;
		var remaining = values.length;
		if (!element.animation.transition) {
			element.animation.transition = element.style.transition;
		}
		element.style.transition = 'all ' + (time / 1000 + 's');
		function complete() {
			remaining--;
			if (!remaining) {
				if (element.animation.transition) {
					element.style.transition = element.animation.transition;
					element.animation.transition = undefined;
				}
				if (typeof callback === 'function') {
					callback();
				}
			}
		}
		var computedStyle = computedStyle || window.getComputedStyle(element);
		for ( var index in values) {
			if (values.hasOwnProperty(index)) {
				var value = values[index];
				animateSingle(element, index, value, time, complete, computedStyle);
			}
		}
	}

	Animation.prototype = {};

	Animation.animate = animate;
	return Animation;
})();

if (typeof Build !== 'undefined') {
	Build.register('build.utility.Animation', build.utility.Animation);
}