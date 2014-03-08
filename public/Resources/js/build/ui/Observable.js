var build = build || {};
build.ui = build.ui || {};
var Observable = build.ui.Observable = (function() {
	function Observable(value) {
		var inner = value;
		this.subscribed = [];
		this.publish = function(value) {
			inner = value;
			for (var index = 0, length = this.subscribed.length; index < length; index++) {
				this.subscribed[index](inner);
			}
		};
	}

	function subscribe(listener) {
		if (typeof listener == 'function') {
			var index = this.subscribed.indexOf(listener);
			if (index == -1) {
				this.subscribed.push(listener);
			}
		}
	}

	function bind(element, handler) {
		switch (element.type) {
		case 'input':
		case 'textarea':
		case 'select':
			element.addEventListener('change', function(event) {
				subscribe(event, this.value);
			});
			break;

		}
	}
	Observable.prototype.subscribe = subscribe;
	return Observable;
});
