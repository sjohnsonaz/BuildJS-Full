var build = build || {};
build.utility = build.utility || {};
build.utility.PostMessage = (function() {
	function PostMessage(otherWindow, channel, targetOrigin) {
		this.channel = channel;
		this.otherWindow = otherWindow;
		this.targetOrigin = targetOrigin || '*';
		this.listeners = [];
		this.callbacks = {};
		var listenerHandler = function(event) {
			var message = JSON.parse(event.data);
			if (message.channel == this.channel) {
				if (message.key) {
					var callback = this.callbacks[message.key];
					if (callback) {
						window.clearTimeout(callback.timeout);
						callback.success(message.data, event);
						delete this.callbacks[message.key];
					} else {
						function reply(replyMessage, callback) {
							
						}
						for (var index = 0, length = this.listeners.length; index < length; index++) {
							var listener = this.listeners[index];
							listener(message.data, event, this.send);
						}
					}
				} else {
					for (var index = 0, length = this.listeners.length; index < length; index++) {
						var listener = this.listeners[index];
						listener(message.data, event);
					}
				}
			}
		}.bind(this);
		this.listen = function() {
			if (this.channel) {
				window.addEventListener('message', listenerHandler, false);
			}
		};
		this.stop = function() {
			window.removeEventListener('message', listenerHandler);
		};
	}
	function addListener(listener) {
		return this.listeners.indexOf(listener) == -1 ? this.listeners.push(listener) : this.listeners.length;
	}
	function removeListener(listener) {
		var index = this.listeners.indexOf(listener);
		return index != -1 ? this.listeners.splice(index, 1) : [];
	}
	function send(message, key, callbackObject) {
		message = {
			channel : this.channel,
			data : message
		};
		if (key) {
			message.key = key;
		}
		if (callbackObject) {
			key = key || Math.floor(Math.random() * 100000000) + '-' + Date.now();
			message.key = key;
			this.callbacks[key] = callbackObject;
			var timeout = callbackObject.timeout || 5000;
			if (timeout != -1) {
				callbackObject.timeout = window.setTimeout(function() {
					callbacksObject.error();
					delete this.callbacks[key];
				}.bind(this), timeout);
			}
		}
		this.otherWindow.postMessage(JSON.stringify(message), this.targetOrigin);
	}
	PostMessage.prototype = {
		addListener : addListener,
		removeListener : removeListener,
		send : send
	};
	return PostMessage;
})();

if (typeof Build !== 'undefined') {
	Build.definitions['build.utility.PostMessage'] = build.utility.PostMessage;
}