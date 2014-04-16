/**
 * @class build.ui.SwitcherPanel
 * @extends build.ui.Panel
 */
Build('build.ui.SwitcherPanel', [ 'build::build.ui.Panel', 'build::build.utility.Navigation' ], function(define, $super, helper) {
	define({
		$extends : 'build.ui.Panel',
		/**
		 * @constructor
		 */
		/**
		 * @property lockable
		 * @property active
		 * @property hideMode
		 */
		$constructor : function SwitcherPanel(active) {
			$super(this)();
			this.lockable = false;
			var Navigation = build.utility.Navigation();
			this.watchValue('active', 0, null, function(value, cancel) {
				return (this.lockable && Navigation.locked) ? (window.confirm(Navigation.message) ? value : cancel) : value;
			}.bind(this));
			this.subscribe('active', function(value) {
				this.refreshChildren();
			}.bind(this));
			this.watchValue('hideMode', 'DOM');
		},
		$prototype : {
			/**
			 * @method init
			 * @param active
			 */
			init : function(active) {
				$super().init(this)(active);
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function() {
				var element = this.element;
				if (element) {
					switch (this.hideMode) {
					case 'DOM':
						while (element.firstChild) {
							element.removeChild(element.firstChild);
						}
						if (this.children) {
							var active = this.children[this.active];
							if (active) {
								this.childIterator(active, this.active, this.children);
							}
						}
						break;
					case 'DISPLAY':
						break;
					case 'VISIBILITY':
						break;
					}
				}
			},
		},
		$static : {
			/**
			 * @property HideMode
			 * @static
			 */
			HideMode : {
				'DOM' : 'DOM',
				'DISPLAY' : 'DISPLAY',
				'VISIBILITY' : 'VISIBILITY'
			}
		}
	});
});