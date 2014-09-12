/**
 * @class build.ui.Switcher
 * @extends build.ui.Container
 */
Build('build.ui.Switcher', [ 'build::build.ui.Container', 'build::build.utility.Navigation' ], function(define, $super) {
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
		$constructor : function Switcher(active) {
			$super(this)();
			this.lockable = false;
			var Navigation = build.utility.Navigation();
			// TODO: This can also be an array
			this.watchValue('hideMode', 'VISIBILITY', null, function(value, cancel) {
				this.refreshChildren();
				return value;
			}.bind(this));
			this.watchValue('active', 0, null, function(value, cancel) {
				var output = (this.lockable && Navigation.locked) ? (Navigation.run() ? value : cancel) : value;
				if (output != cancel && value !== this.active) {
					// Correct for index out of range.
					if (this.children.length) {
						output %= this.children.length;
					}
					this.showChild(output, this.active || 0);
				}
				return output;
			}.bind(this));
		},
		$prototype : {
			/**
			 * @method showChild
			 * @param index
			 * @param oldIndex
			 */
			showChild : function(index, oldIndex) {
				var child = this.children[index];
				var oldChild = this.children[oldIndex];
				switch (this.hideMode) {
				case 'DOM':
					if (oldChild) {
						this.innerElement.removeChild(oldChild.element);
					}
					if (child) {
						this.innerElement.appendChild(child.element);
					}
					break;
				case 'DISPLAY':
					if (oldChild) {
						oldChild.element.classList.add('hidden');
					}
					if (child) {
						child.element.classList.remove('hidden');
					}
					break;
				case 'VISIBILITY':
					if (oldChild) {
						oldChild.element.classList.add('hidden-soft');
					}
					if (child) {
						child.element.classList.remove('hidden-soft');
					}
					break;
				default:
					this.refreshChildren();
					break;
				}
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
						this.innerElement.appendChild(this.createChild(active));
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
			/**
			 * @method createChildrenHandler
			 * We attempt to keep the active child active.
			 * If there are no children, active = 0.
			 */
			createChildrenHandler : function() {
				return {
					push : function(child) {
						if (this.hideMode != 'DOM' || this.children.length == 1) {
							var element = this.innerElement;
							if (element) {
								child = this.createChild(child);
								element.appendChild(child);
							}
						} else {
							this.linkChild(child);
						}
					}.bind(this),
					pop : function() {
						var element = this.innerElement;
						if (element) {
							this.destroyChild(element.lastChild);
							element.removeChild(element.lastChild);
						}
					}.bind(this),
					unshift : function(child) {
						// Add to beginning of array
						var element = this.innerElement;
						if (element) {
							child = this.createChild(child);
							element.insertBefore(child, element.firstChild);
						}
					}.bind(this),
					shift : function() {
						// Remove from beginning of array
						var element = this.innerElement;
						if (element) {
							this.destroyChild(element.firstChild);
							element.removeChild(element.firstChild);
						}
					}.bind(this),
					reverse : function() {
						// Sort in opposite direction
						this.refreshChildren();
					}.bind(this),
					sort : function() {
						// Sort based on function
						this.refreshChildren();
					}.bind(this),
					splice : function(index, howMany) {
						var element = this.innerElement;
						if (element) {
							var nextSibling = element.childNodes[index + howMany];
							var elementsToAdd = Array.prototype.slice.call(arguments, 2);
							var elementsToRemove = Array.prototype.slice.call(element.childNodes, index, index + howMany);
							var elementToRemove;
							while (elementToRemove = elementsToRemove.pop()) {
								this.destroyChild(elementToRemove);
								element.removeChild(elementToRemove);
							}
							var elementToAdd;
							while (elementToAdd = elementsToAdd.pop()) {
								child = this.createChild(child);
								element.insertBefore(elementToAdd, nextSibling);
							}
						}
						this.refreshChildren();
					}.bind(this),
					get : function(index) {
						// TODO: Is this necessary?
						var element = this.innerElement;
						return element.childNodes[index];
					}.bind(this),
					set : function(index, child) {
						var element = this.innerElement;
						if (element) {
							var oldChild = element.childNodes[index];
							if (oldChild) {
								this.destroyChild(oldChild);
								child = this.createChild(child);
								element.replaceChild(oldChild, child);
							}
						}
					}.bind(this),
					removeAll : function() {
						var element = this.innerElement;
						if (element) {
							while (element.firstChild) {
								this.destroyChild(element.firstChild);
								element.removeChild(element.firstChild);
							}
						}
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