/**
 * @class build.ui.SwitcherPanel
 * @extends build.ui.Container
 */
Build('build.ui.SwitcherPanel', [ 'build::build.ui.Container', 'build::build.utility.Navigation' ], function(define, $super) {
	define({
		$extends : 'build.ui.Container',
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
				return (this.lockable && Navigation.locked) ? (Navigation.run() ? value : cancel) : value;
			}.bind(this));
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
				var element = this.innerElement;
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
				var element = this.innerElement;
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				if (this.children) {
					var active = this.children[this.active];
					if (active) {
						innerElement.appendChild(this.createChild(active));
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
			},
			createChildrenHandler : function() {
				return {
					push : function(child) {
						this.refreshChildren();
						//var element = this.innerElement;
						//if (element) {
						//child = this.createChild(child);
						//element.appendChild(child);
						//}
					}.bind(this),
					pop : function() {
						this.refreshChildren();
						//var element = this.innerElement;
						//if (element) {
						//element.removeChild(element.lastChild);
						//}
					}.bind(this),
					unshift : function() {
						// Add to beginning of array
						this.refreshChildren();
					}.bind(this),
					shift : function() {
						// Remove from beginning of array
						this.refreshChildren();
					}.bind(this),
					reverse : function() {
						// Sort in opposite direction
						this.refreshChildren();
					}.bind(this),
					sort : function() {
						// Sort based on function
						this.refreshChildren();
					}.bind(this),
					splice : function() {
						this.refreshChildren();
					}.bind(this),
					get : function() {
						this.refreshChildren();
					}.bind(this),
					set : function() {
						this.refreshChildren();
					}.bind(this),
					removeAll : function() {
						this.refreshChildren();
					}.bind(this),
					subscribe : function() {
						this.refreshChildren();
					}.bind(this),
					publish : function() {
						this.refreshChildren();
					}.bind(this)
				};
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