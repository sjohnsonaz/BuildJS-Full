Build('build.ui.Module', [], function(define, $super, merge, safe) {
	define({
		$constructor : function Module() {
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
			watch : function(name, value, get, set) {
				var hidden = value;
				Object.defineProperty(this, name, {
					get : function() {
						safe(get)(this, hidden);
						return hidden;
					},
					set : function(value) {
						var override = safe(set)(value);
						if (typeof override !== 'undefined') {
							value = override;
						}
						hidden = value;
						this.publish(name);
					}
				});
			},
			subscribe : function(property, subscriber) {
				if (typeof subscriber === 'function') {
					this.subscribers = this.subscribers || {};
					this.subscribers[property] = this.subscribers[property] || [];
					this.subscribers[property].push(subscriber);
					subscriber(this[property]);
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