/**
 * @class build.Module
 * Base class for self contained modules such as UI components.
 */
Build('build.Module', [], function(define, $super) {
	var cancel = {
		cancel : true
	};
	define({
		/**
		 * @constructor
		 * Creates a new Module instance.
		 * @property callbacks
		 * @property subscribers
		 */
		$constructor : function Module() {
			// this.callbacks = null;
			// this.subscribers = null;
		},
		$prototype : {
			/**
			 * @method addCallback
			 * @param {String} type
			 * @param {Function} callback
			 */
			addCallback : function(type, callback) {
				this.callbacks = this.callbacks || {};
				var callbacks = this.callbacks[type] = this.callbacks[type] || [];
				if (callbacks.indexOf(callback) == -1) {
					callbacks.push(callback);
				}
			},
			/**
			 * @method removeCallback
			 * @param {String} type
			 * @param {Function} callback
			 */
			removeCallback : function(type, callback) {
				if (this.callbacks && this.callbacks[type]) {
					var callbacks = this.callbacks[type];
					var index = callbacks.indexOf(callback);
					if (index != -1) {
						callbacks.splice(index, 1);
					}
				}
			},
			/**
			 * @method runCallbacks
			 * @param {String} type
			 */
			runCallbacks : function(type) {
				if (this.callbacks) {
					var callbacks = this.callbacks[type];
					if (callbacks) {
						var argumentsArray = Array.prototype.slice.call(arguments, 1);
						for (var index = 0, length = callbacks.length; index < length; index++) {
							var callback = callbacks[index];
							callback.apply(this, argumentsArray);
						}
					}
				}
			},
			/**
			 * @method watchValue
			 * @param name
			 * @param value
			 * @param get
			 * @param set
			 */
			watchValue : function(name, value, get, set) {
				var hidden = value;
				Object.defineProperty(this, name, {
					configurable : true,
					get : typeof get === 'function' ? function() {
						return get(hidden, this);
					} : function() {
						return hidden;
					},
					set : typeof set == 'function' ? function(value) {
						value = set(value, cancel);
						if (value !== cancel) {
							hidden = value;
							this.publish(name);
						}
					} : function(value) {
						hidden = value;
						this.publish(name);
					}
				});
			},
			/**
			 * @method subscribe
			 * @param property
			 * @param subscriber
			 */
			subscribe : function(property, subscriber) {
				if (typeof subscriber === 'function') {
					this.subscribers = this.subscribers || {};
					this.subscribers[property] = this.subscribers[property] || [];
					this.subscribers[property].push(subscriber);
					subscriber(this[property]);
				}
			},
			/**
			 * @method unsubscribe
			 * @param property
			 * @param subscriber
			 */
			unsubscribe : function(property, subscriber) {
				if (this.subscribers && this.subscribers[property]) {
					var index = this.subscribers[property].indexOf(subscriber);
					if (index != -1) {
						this.subscribers[property].splice(index, 1);
						if (this.subscribers[property].length == 0) {
							delete this.subscribers[property];
						}
					}
				}
			},
			/**
			 * @method publish
			 * @param property
			 */
			publish : function(property) {
				if (this.subscribers && this.subscribers[property]) {
					var subscribers = this.subscribers[property];
					for (var index = 0, length = subscribers.length; index < length; index++) {
						subscribers[index](this[property]);
					}
				}
			}
		}
	});
});