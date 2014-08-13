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

	//Accessor methods
	//These methods do not modify the array and return some representation of the array.
	//Array.prototype.concat()
	//Returns a new array comprised of this array joined with other array(s) and/or value(s).
	//Array.prototype.join()
	//Joins all elements of an array into a string.
	//Array.prototype.slice()
	//Extracts a section of an array and returns a new array.
	//Array.prototype.toSource() 
	//Returns an array literal representing the specified array; you can use this value to create a new array. Overrides the Object.prototype.toSource() method.
	//Array.prototype.toString()
	//Returns a string representing the array and its elements. Overrides the Object.prototype.toString() method.
	//Array.prototype.toLocaleString()
	//Returns a localized string representing the array and its elements. Overrides the Object.prototype.toLocaleString() method.
	//Array.prototype.indexOf()
	//Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
	//Array.prototype.lastIndexOf()
	//Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.

	//Iteration methods
	//Several methods take as arguments functions to be called back while processing the array. When these methods are called, the length of the array is sampled, and any element added beyond this length from within the callback is not visited. Other changes to the array (setting the value of or deleting an element) may affect the results of the operation if the method visits the changed element afterwards. While the specific behavior of these methods in such cases is well-defined, you should not rely upon it so as not to confuse others who might read your code. If you must mutate the array, copy into a new array instead.
	//Array.prototype.forEach()
	//Calls a function for each element in the array.
	//Array.prototype.entries() 
	//Returns a new Array Iterator object that contains the key/value pairs for each index in the array.
	//Array.prototype.every()
	//Returns true if every element in this array satisfies the provided testing function.
	//Array.prototype.some()
	//Returns true if at least one element in this array satisfies the provided testing function.
	//Array.prototype.filter()
	//Creates a new array with all of the elements of this array for which the provided filtering function returns true.
	//Array.prototype.find() 
	//Returns the found value in the array, if an element in the array satisfies the provided testing function or undefined if not found.
	//Array.prototype.findIndex() 
	//Returns the found index in the array, if an element in the array satisfies the provided testing function or -1 if not found.
	//Array.prototype.keys() 
	//Returns a new Array Iterator that contains the keys for each index in the array.
	//Array.prototype.map()
	//Creates a new array with the results of calling a provided function on every element in this array.
	//Array.prototype.reduce()
	//Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.
	//Array.prototype.reduceRight()
	//Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value.

	/**
	 * @method push
	 * Array.prototype.push()
	 * Adds one or more elements to the end of an array and returns the new length of the array.
	 * @returns
	 */
	function push() {
		var output = Array.prototype.push.apply(this, arguments);
		this.publish('push', arguments);
		return output;
	}

	/**
	 * @method pop
	 * Array.prototype.pop()
	 * Removes the last element from an array and returns that element.
	 * @returns
	 */
	function pop() {
		var output = Array.prototype.pop.apply(this, arguments);
		this.publish('pop', arguments);
		return output;
	}

	/**
	 * @method unshift
	 * Array.prototype.unshift()
	 * Adds one or more elements to the front of an array and returns the new length of the array.
	 * @returns
	 */
	function unshift() {
		var output = Array.prototype.unshift.apply(this, arguments);
		this.publish('unshift', arguments);
		return output;
	}

	/**
	 * @method shift
	 * Array.prototype.shift()
	 * Removes the first element from an array and returns that element.
	 * @returns
	 */
	function shift() {
		var output = Array.prototype.shift.apply(this, arguments);
		this.publish('shift', arguments);
		return output;
	}

	/**
	 * @method reverse
	 * Array.prototype.reverse()
	 * Reverses the order of the elements of an array -- the first becomes the last, and the last becomes the first.
	 * @returns
	 */
	function reverse() {
		var output = Array.prototype.reverse.apply(this, arguments);
		this.publish('reverse', arguments);
		return output;
	}

	/**
	 * @method sort
	 * Array.prototype.sort()
	 * Sorts the elements of an array in place and returns the array.
	 * @returns
	 */
	function sort() {
		var output = Array.prototype.sort.apply(this, arguments);
		this.publish('sort', arguments);
		return output;
	}

	/**
	 * @method splice
	 * Array.prototype.splice()
	 * Adds and/or removes elements from an array.
	 * @returns
	 */
	function splice() {
		var output = Array.prototype.splice.apply(this, arguments);
		this.publish('splice', arguments);
		return output;
	}

	//+ Array.prototype.fill()
	//Fills all the elements of an array from a start index to an end index with a static value.

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