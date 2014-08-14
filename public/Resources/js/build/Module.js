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
		 * @property subscriptions
		 */
		$constructor : function Module() {
			this.watchValue('bound', null, function(value, self) {

			}, function(value, cancel) {

			});
			// this.callbacks = null;
			// this.subscribers = null;
			// this.subscriptions = null;
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
				if (subscriber) {
					this.subscribers = this.subscribers || {};
					this.subscribers[property] = this.subscribers[property] || [];
					var subscription = {
						publisher : this,
						property : property,
						subscriber : subscriber
					};
					this.subscribers[property].push(subscription);
					if (typeof subscriber === 'function') {
						subscriber(this[property]);
					} else {
						subscriber.subscriptionLink(subscription);
						subscriber.notify(property, this[property]);
					}
				}
			},
			/**
			 * @method unsubscribe
			 * @param property
			 * @param subscriber
			 */
			unsubscribe : function(subscription, isDestroying) {
				var property = subscription.property;
				if (this.subscribers && this.subscribers[property]) {
					var index = this.subscribers[property].indexOf(subscription);
					if (index != -1) {
						this.subscribers[property].splice(index, 1);
						if (typeof subscription === 'object' && !isDestroying) {
							subscription.subscriber.subscriptionUnlink(subscription);
						}
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
						subscribers[index].subscriber(this[property]);
					}
				}
			},
			/**
			 * @method subscriptionLink
			 * @param subscription
			 */
			subscriptionLink : function(subscription) {
				this.subscriptions = this.subscriptions || [];
				this.subscriptions.push(subscription);
			},
			/**
			 * @method subscriptionUnlink
			 * @param subscription
			 */
			subscriptionUnlink : function(subscription) {
				if (this.subscriptions) {
					var index = this.subscriptions.indexOf(subscription);
					if (index != -1) {
						this.subscriptions.splice(index, 1);
					}
				}
			},
			/**
			 * @method bind
			 */
			bind : function(value) {
				this.bound = value;
				// Subscribe to value.
			},
			/**
			 * @method destroy
			 */
			destroy : function(isDestroying) {
				// Unsubscribe from all.
				if (this.subscribers) {
					for ( var property in this.subscribers) {
						var propertySubscribers = this.subscribers[property];
						for (var index = 0, length = propertySubscribers.length; index < length; index++) {
							var subscription = propertySubscribers[index];
							if (typeof subscription.subscriber === 'object') {
								subscription.subscriber.subscriptionUnlink(subscription);
							}
						}
					}
				}
				// Destroy all subscriptions
				if (this.subscriptions) {
					for (var index = 0, length = this.subscriptions.length; index < length; index++) {
						var subscription = this.subscriptions[index];
						subscription.publisher.unsubscribe(subscription, true);
					}
				}
			}
		}
	});
});