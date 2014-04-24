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
			// TODO: This can also be an array
			this.watchValue('active', 0, null, function(value, cancel) {
				return (this.lockable && Navigation.locked) ? (window.confirm(Navigation.message) ? value : cancel) : value;
			}.bind(this));
			this.directAppend = true;
			this.watchValue('hideMode', 'VISIBILITY');
		},
		$prototype : {
			/**
			 * @method init
			 * @param active
			 */
			init : function(active) {
				$super().init(this)(active);
				this.subscribe('active', function(value) {
					switch (this.hideMode) {
					case 'DOM':
						this.refreshDom();
						break;
					case 'DISPLAY':
						this.refreshDisplay();
						break;
					case 'VISIBILITY':
						this.refreshVisibility();
						break;
					default:
						break;
					}
				}.bind(this));
			},
			/**
			 * @method refreshChildren
			 */
			refreshChildren : function() {
				var element = this.element;
				if (element) {
					switch (this.hideMode) {
					case 'DOM':
						this.refreshDom();
						break;
					case 'DISPLAY':
						$super().refreshChildren(this)();
						this.refreshDisplay();
						break;
					case 'VISIBILITY':
						$super().refreshChildren(this)();
						this.refreshVisibility();
						break;
					default:
						$super().refreshChildren(this)();
						break;
					}
				}
			},
			refreshDom : function() {
				var element = this.element;
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				if (this.children) {
					var active = this.children[this.active];
					if (active) {
						this.childIterator(active, this.active, this.children);
					}
				}
			},
			refreshDisplay : function() {
				for (var index = 0, length = this.children.length; index < length; index++) {
					var child = this.children[index];
					child.element.classList.add('hidden');
				}
				var activeChild = this.children[this.active];
				if (activeChild && activeChild.element) {
					activeChild.element.classList.remove('hidden');
				}
			},
			refreshVisibility : function() {
				for (var index = 0, length = this.children.length; index < length; index++) {
					var child = this.children[index];
					child.element.classList.add('hidden-soft');
				}
				var activeChild = this.children[this.active];
				if (activeChild && activeChild.element) {
					activeChild.element.classList.remove('hidden-soft');
				}
			}
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