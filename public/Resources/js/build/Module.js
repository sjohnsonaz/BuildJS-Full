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
			// this.handlers = null;
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
				var hidden = typeof set === 'function' ? set(value, cancel) : value;
				Object.defineProperty(this, name, {
					configurable : true,
					enumerable : true,
					get : typeof get === 'function' ? function() {
						return get(hidden, this);
					} : function() {
						return hidden;
					},
					set : typeof set === 'function' ? function(value) {
						if (value !== hidden) {
							value = set(value, cancel);
							if (value !== cancel) {
								hidden = value;
								this.publish(name);
							}
						}
					} : function(value) {
						if (value !== hidden) {
							hidden = value;
							this.publish(name);
						}
					}
				});
			},
			/**
			 * @method subscribe
			 * @param property
			 * @param subscriber
			 */
			subscribe : function(property, subscriber, deferNotify) {
				if (subscriber) {
					this.subscribers = this.subscribers || {};
					this.subscribers[property] = this.subscribers[property] || [];
					var subscription = {
						publisher : this,
						property : property,
						subscriber : subscriber
					};
					this.subscribers[property].push(subscription);
					if (typeof subscriber === 'object') {
						subscriber.subscriptionLink(subscription);
					}
					if (!deferNotify) {
						this.publish(property, subscription);
					}
					return subscription;
				}
			},
			/**
			 * @method getSubscription
			 * @param subscriber
			 * @param property
			 */
			getSubscription : function(subscriber, property) {
				var output = null;
				if (this.subscriptions) {
					for (var index = 0, length = this.subscriptions.length; index < length; index++) {
						var subscription = this.subscriptions[index];
						if (subscription.subscriber === subscriber && subscription.property === property) {
							output = subscription;
							break;
						}
					}
				}
				return output;
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
						if (typeof subscription.subscriber === 'object' && !isDestroying) {
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
			publish : function(property, subscriber) {
				// Publish to a single subscriber, or all subscribers.
				if (subscriber) {
					if (typeof subscriber === 'function') {
						subscriber(this[property]);
					} else if (subscriber instanceof build.Module) {
						var subscription = this.getSubscription(subscriber, property);
						if (subscription) {
							subscription.value = this[property];
							subscriber.notify(subscription, this[property]);
						}
					} else if (typeof subscriber === 'object') {
						var subscription = subscriber;
						subscriber = subscription.subscriber;
						subscription.value = this[property];
						if (typeof subscriber === 'function') {
							subscriber(this[property]);
						} else {
							subscriber.notify(subscription, this[property]);
						}
					}
				} else {
					if (this.subscribers && this.subscribers[property]) {
						var subscribers = this.subscribers[property];
						subscribers.forEach(function(subscription, index, array) {
							subscription.value = this[property];
							if (typeof subscription.subscriber === 'function') {
								subscription.subscriber(this[property]);
							} else {
								subscription.subscriber.notify(subscription, this[property]);
							}
						}.bind(this));
					}
				}
			},
			/**
			 * 
			 */
			notify : function(subscription, value) {
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
			 * @method addHandler
			 * @param handler
			 */
			addHandler : function(handler) {
				if (!this.handlers) {
					this.handlers = [ handler ];
				} else if (this.handlers.indexOf(handler) == -1) {
					this.handlers.push(this);
				}
			},
			/**
			 * @method removeHandler
			 * @param handler
			 */
			removeHandler : function(handler) {
				if (this.handlers) {
					var index = this.handlers.indexOf(handler);
					if (index != -1) {
						this.splice(index, 1);
					}
				}
			},
			///**
			//* @method bind
			//*/
			//bind : function(source, property, handler) {
			////this.bound = source;
			//if (source && property && handler) {
			//this.handlers[property] = handler;
			//handler.bind(source, this);
			//}
			//},
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
					this.subscribers.length = 0;
				}

				// Destroy all subscriptions
				if (this.subscriptions) {
					for (var index = 0, length = this.subscriptions.length; index < length; index++) {
						var subscription = this.subscriptions[index];
						subscription.publisher.unsubscribe(subscription, true);
					}
					this.subscriptions.length = 0;
				}

				// Destroy all binding handlers.
				if (this.handlers) {
					for ( var property in this.handlers) {
						this.handlers[property].destroy();
						delete this.handlers[property];
					}
				}
			}
		}
	});
});