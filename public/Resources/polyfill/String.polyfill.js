// These are Harmony features.
(function() {
	// TODO: This is included in Build.js.
	if (!String.prototype.endsWith) {
		Object.defineProperty(String.prototype, 'endsWith', {
			enumerable : false,
			configurable : false,
			writable : false,
			value : function(searchString, position) {
				position = (position || this.length) - searchString.length;
				var lastIndex = this.lastIndexOf(searchString);
				return lastIndex !== -1 && lastIndex === position;
			}
		});
	}
	if (!String.prototype.startsWith) {
		Object.defineProperty(String.prototype, 'startsWith', {
			enumerable : false,
			configurable : false,
			writable : false,
			value : function(searchString, position) {
				position = position || 0;
				return this.indexOf(searchString, position) === position;
			}
		});
	}
})();