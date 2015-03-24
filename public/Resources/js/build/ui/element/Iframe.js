/**
 * @class build.ui.element.Iframe
 * @extends build.ui.Widget
 */
Build('build.ui.element.Iframe', [ 'build::build.ui.Widget', 'build::build.utility.PostMessage' ], function($define, $super) {
	$define({
		$extends : 'build.ui.Widget',
		$constructor : function Iframe() {
			$super(this)();
			var self = this;
			this.watchProperty('src');
			this.watchProperty('content', 'contentWindow', undefined, null, function(value, current, cancel) {
				if (!value) {
					return cancel;
				}
			});
			this.channels = [];
			this.postMessages = {};
			this.element.onload = function() {
				// Build all PostMessages here.
				self.postMessages = {};
				for (var index = 0, length = self.channels.length; index < length; index++) {
					var name = self.channels[index];
					self.postMessages[name] = new build.utility.PostMessage(self.element.contentWindow, name);
					self.postMessages[name].listen();
				}
				self.publish('content');
			};
		},
		$prototype : {
			type : 'iframe',
			addChannel : function(name) {
				return this.channels.indexOf(name) == -1 ? this.channels.push(name) : this.channels.length;
			},
			removeChannel : function(name) {
				var index = this.channels.indexOf(name);
				return index != -1 ? this.channels.splice(index, 1) : [];
			},
			getChannel : function(name) {
				return this.postMessages[name];
			},
			send : function(name) {
				var postMessage = this.postMessages[name];
				if (postMessage) {
					postMessage.send.apply(Array.prototype.apply.call(arguments).shift(1));
				}
			}
		}
	});
});