/**
 * @class build.Module
 * Base class for self contained modules such as UI components.
 * Browser Support: IE9+
 */
Build('build.Module', [], function($define, $super) {
	var cancel = {
		cancel : true
	};
	$define({
		/**
		 * @constructor
		 * Creates a new Module instance.
		 * @property callbacks
		 * @property subscribers
		 * @property subscriptions
		 */
		$constructor : function Module() {
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
			 * @method runSet
			 * @param value
			 * @param set
			 */
			runSet : function(value, set, thisArg) {
				var output;
				if (typeof set === 'function') {
					if (thisArg) {
						output = set.call(thisArg, value, undefined, cancel)
					} else {
						output = set(value, undefined, cancel);
					}
					if (output === cancel) {
						output = undefined;
					}
				} else {
					output = value;
				}
				return output;
			},
			/**
			 * @method watchValue
			 * @param name
			 * @param value
			 * @param get
			 * @param set
			 */
			watchValue : function(name, value, get, set, thisArg, definition) {
				var hidden = this.runSet(value, set, thisArg);
				Object.defineProperty(this, name, Build.merge({
					configurable : true,
					enumerable : true,
					get : typeof get === 'function' ? function() {
						return thisArg ? get.call(thisArg, hidden, this) : get(hidden, this);
					} : function() {
						return hidden;
					},
					set : typeof set === 'function' ? function(value) {
						if (value !== hidden) {
							value = thisArg ? set.call(thisArg, value, hidden, cancel) : set(value, hidden, cancel);
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
				}, definition));
			},
			/**
			 * @method subscribe
			 * @param property
			 * @param subscriber
			 */
			subscribe : function(property, subscriber, deferNotify) {
				if (subscriber) {
					if (!this.subscribers) {
						Object.defineProperty(this, 'subscribers', {
							value : {},
							writable : true,
							configurable : true,
							enumerable : false
						});
					}
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
						var publishLockers = this.publishLocks ? this.publishLocks[property] : undefined;
						var publishStop = this.publishStops ? this.publishStops[property] : false;
						// TODO: Attempt to change to for loop.  This is to protect against deleted subscribers.
						subscribers.forEach(function(subscription, index, array) {
							subscription.value = this[property];
							if (!publishStop) {
								if (typeof subscription.subscriber === 'function') {
									subscription.subscriber(this[property]);
								} else {
									// TODO This is not efficient.
									if (publishLockers ? publishLockers.indexOf(subscription.subscriber) == -1 : true) {
										subscription.subscriber.notify(subscription, this[property]);
									}
								}
							}
						}, this);
					}
				}
			},
			preventNotifications : function(name, lock, publishLocker) {
				if (publishLocker) {
					if (!this.publishLocks) {
						Object.defineProperty(this, 'publishLocks', {
							value : {},
							writable : true,
							configurable : true,
							enumerable : false
						});
					}
					this.publishLocks[name] = this.publishLocks[name] || [];
					if (lock) {
						if (this.publishLocks[name].indexOf(publishLocker) == -1) {
							this.publishLocks[name].push(publishLocker);
						}
					} else {
						var index = this.publishLocks[name].indexOf(publishLocker);
						if (index != -1) {
							this.publishLocks[name].splice(index, 1);
						}
					}
				} else {
					if (!this.publishStops) {
						Object.defineProperty(this, 'publishStops', {
							value : {},
							writable : true,
							configurable : true,
							enumerable : false
						});
					}
					if (lock) {
						this.publishStops[name] = true;
					} else {
						delete this.publishStops[name];
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
				if (!this.subscriptions) {
					Object.defineProperty(this, 'subscriptions', {
						value : [],
						writable : true,
						configurable : true,
						enumerable : false
					});
				}
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
					// TODO: Determine if Object.hasOwnProperty is necessary
					for ( var property in this.subscribers) {
						var propertySubscribers = this.subscribers[property];
						for (var index = 0, length = propertySubscribers.length; index < length; index++) {
							var subscription = propertySubscribers[index];
							// TODO: Destroy function subscribers
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
					// TODO: Determine if Object.hasOwnProperty is necessary
					for ( var property in this.handlers) {
						this.handlers[property].destroy();
						delete this.handlers[property];
					}
				}
			},
			formatString : function(pattern, values) {
				if (typeof pattern === 'string') {
					if (!(values instanceof Array) && typeof values !== 'object') {
						values = Array.prototype.slice.call(arguments).splice(1, 1);
					}
					return pattern.replace(/\{\{|\}\}|\{(\d+)\}|\{(\w+):(.+)\}/g, function(match, valueIndex, helperName, argsText) {
						if (match == "{{") {
							return "{";
						}
						if (match == "}}") {
							return "}";
						}
						if (helperName) {
							var helper = build.Module.helpers[helperName];
							if (typeof helper === 'function') {
								var argsIndexes = argsText.match(/\[(.*)\]|(\d+)|([A-Za-z_][A-Za-z0-9_]*)(.[A-Za-z_][A-Za-z0-9_]*)*/g);
								var args = [];
								for (var index = 0, length = argsIndexes.length; index < length; index++) {
									var argIndex = argsIndexes[index];
									if (argIndex[0] === '[') {
										args[index] = argIndex.substring(1, argIndex.length - 1);
									} else {
										if (typeof argIndex === 'string') {
											args[index] = getValue(values, argIndex);
										} else {
											args[index] = values[argIndex];
										}
									}
								}
								return helper.apply(this, args);
							} else {
								// Helper not found
								return '';
							}
						} else {
							return values[valueIndex];
						}
					});
				} else {
					return pattern;
				}
			},
			createEval : function(code) {
				return new Function('values', '\
						with (values) {\
							return (' + code + ');\
						}\
					');
			},
			createEvalStrict : function(code) {
				return new Function('values', '\
						with (values) {\
							return (function() {\
								"use strict";\
								return eval("' + code + '");\
							})();\
						}\
					');
			}
		},
		$static : {
			helpers : {
				'i' : function(value) {
					return '<i class="fa fa-' + value + '"></i>';
				}
			}
		}
	});

	function getValue(obj, name) {
		var value = obj[name];
		if (typeof value === 'undefined') {
			var nameArray = name.split('.');
			value = obj;
			for (var index = 0, length = nameArray.length; index < length; index++) {
				if (typeof value === 'undefined') {
					break;
				}
				value = value[nameArray[index]];
			}
		}
		return value;
	}
});