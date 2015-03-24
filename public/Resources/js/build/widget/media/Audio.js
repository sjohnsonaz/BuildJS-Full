/**
 * @class build.widget.media.Audio
 * @extends build.ui.Container
 */
Build('build.widget.media.Audio', [ 'build::build.ui.Container' ], function(define, $super) {
	define({
		$extends : 'build.ui.Widget',
		/**
		 * @constructor
		 */
		$constructor : function Audio(src) {
			$super(this)();
			var self = this;
			this.watchProperty('src', 'src', src);
			this.watchProperty('canplay', 'src');
			this.addEventListener('canplay', function(element, event) {
				this.publish('canplay');
			}, false, this);
			this.watchProperty('muted');
			this.watchProperty('volume');
			this.watchProperty('playbackRate');
			this.watchValue('play', false, function(value) {
				return !self.element.paused;
			}, function(value, current, cancel) {
				if (value) {
					self.element.play();
				} else {
					self.element.pause();
				}
				return !!value;
			});
			this.sources = {};
			this.tracks = {};
		},
		$prototype : {
			type : 'audio',
			addSource : function(source, type) {
				if (!this.sources[source]) {
					var sourceElement = document.createElement('source');
					sourceElement.src = source;
					if (type) {
						sourceElement.type = type;
					}
					this.element.appendChild(sourceElement);
					this.sources[source] = sourceElement;
				}
			},
			removeSource : function(source) {
				var sourceElement = this.sources[source];
				if (sourceElement) {
					this.element.removeChild(sourceElement);
					delete this.sources[source];
				}
			},
			addTrack : function(track, kind, lang, label) {
				if (!this.tracks[track]) {
					var trackElement = document.createElement('track');
					trackElement.trackElement.src = track;
					if (lang) {
						trackElement.lang = lang;
					}
					if (label) {
						trackElement.label = label;
					}
					if (kind) {
						trackElement.kind = kind;
					}
					this.element.appendChild(trackElement);
					this.tracks[track] = trackElement;
				}
			},
			removeSource : function(track) {
				var trackElement = this.tracks[track];
				if (trackElement) {
					this.element.removeChild(trackElement);
					delete this.tracks[track];
				}
			}
		}
	});
});