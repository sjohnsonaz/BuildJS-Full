Build('build.ui.Module', [], function(define, $super) {
	define({
		$constructor : function() {
			// this.callbacks = null;
			// this.subscribers = null;
		},
		$prototype : {
			addCallback : function(type, callback) {
				this.callbacks = this.callbacks || {};
				var callbacks = this.callbacks[type] = this.callbacks[type] || [];
				if (callbacks.indexOf(callback) == -1) {
					callbacks.push(callback);
				}
			},
			removeCallback : function(type, callback) {
				if (this.callbacks && this.callbacks[type]) {
					var callbacks = this.callbacks[type];
					var index = callbacks.indexOf(callback);
					if (index != -1) {
						callbacks.splice(index, 1);
					}
				}
			},
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
			watchProperty : function(property, name) {
				name = name || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element[name];
					},
					set : function(value) {
						this.element[name] = value;
						this.publish(value);
					}
				});
			},
			watchAttribute : function(property, attribute) {
				attribute = attribute || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element.getAttribute(attribute);
					},
					set : function(value) {
						this.element.setAttribute(attribute, value);
						this.publish(value);
					}
				});
			},
			watchStyle : function(property, style, unit) {
				style = style || property;
				if (unit) {
					Object.defineProperty(this, property, {
						get : function() {
							return parseFloat(this.element.style[style]);
						},
						set : function(value) {
							this.element.style[style] = value + unit;
							this.publish(value);
						}
					});
				} else {
					Object.defineProperty(this, property, {
						get : function() {
							return this.element.style[style];
						},
						set : function(value) {
							this.element.style[style] = value;
							this.publish(value);
						}
					});
				}
			},
			watchData : function(property, data) {
				data = data || property;
				Object.defineProperty(this, property, {
					get : function() {
						return this.element.dataset[data];
					},
					set : function(value) {
						this.element.dataset[data] = value;
						this.publish(value);
					}
				});
			},
			subscribe : function(property, subscriber) {
				if (typeof subscriber === 'function') {
					this.subscribers = this.subscribers || {};
					this.subscribers[property] = this.subscribers[property] || [];
					this.subscribers[property].push(subscriber);
				}
			},
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