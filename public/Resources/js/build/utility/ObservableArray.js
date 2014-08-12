var build = build || {};
build.utility = build.utility || {};
build.utility.ObservableArray = (function() {
	function ObservableArray() {
		var inner = Array.apply({}, arguments);
		inner.push = push.bind(inner);
		inner.pop = pop.bind(inner);
		inner.unshift = unshift.bind(inner);
		inner.shift = shift.bind(inner);
		inner.reverse = reverse.bind(inner);
		inner.sort = sort.bind(inner);
		inner.splice = splice.bind(inner);
		inner.get = get.bind(inner);
		inner.set = set.bind(inner);
		inner.removeAll = removeAll.bind(inner);
		inner.subscribe = subscribe.bind(inner);
		inner.publish = publish.bind(inner);
		return inner;
	}

	function push() {
		var output = Array.prototype.push.apply(this, arguments);
		this.publish('push', arguments);
		return output;
	}

	function pop() {
		var output = Array.prototype.pop.apply(this, arguments);
		this.publish('pop', arguments);
		return output;
	}

	function unshift() {
		var output = Array.prototype.unshift.apply(this, arguments);
		this.publish('unshift', arguments);
		return output;
	}

	function shift() {
		var output = Array.prototype.shift.apply(this, arguments);
		this.publish('shift', arguments);
		return output;
	}

	function reverse() {
		var output = Array.prototype.reverse.apply(this, arguments);
		this.publish('reverse', arguments);
		return output;
	}

	function sort() {
		var output = Array.prototype.sort.apply(this, arguments);
		this.publish('sort', arguments);
		return output;
	}

	function splice() {
		var output = Array.prototype.splice.apply(this, arguments);
		this.publish('splice', arguments);
		return output;
	}

	function removeAll() {
		this.length = 0;
		this.publish('removeAll', arguments);
	}

	function get(index) {
		return this[index];
	}

	function set(index, value) {
		this[index] = value;
		this.publish('set', arguments);
	}

	function subscribe(subscriber) {
		switch (typeof subscriber) {
		case 'object':
		case 'function':
			this.subscribers = this.subscribers || [];
			this.subscribers.push(subscriber);
			break;
		}
	}

	function publish(name, args) {
		if (this.subscribers) {
			for (var index = 0, length = this.subscribers.length; index < length; index++) {
				var subscriber = this.subscribers[index];
				switch (typeof subscriber) {
				case 'function':
					subscriber.apply(this, args);
					break;
				case 'object':
					var handler = subscriber[name];
					if (typeof handler === 'function') {
						handler.apply(this, args);
					}
					break;
				}
			}
		}
	}

	return ObservableArray;
})();

if (typeof Build !== 'undefined') {
	Build.register('build.utility.ObservableArray', build.utility.ObservableArray);
}